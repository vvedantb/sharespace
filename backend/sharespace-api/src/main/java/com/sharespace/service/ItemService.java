package com.sharespace.service;

import com.sharespace.dto.CreateItemRequest;
import com.sharespace.dto.ItemDto;
import com.sharespace.dto.UpdateItemRequest;
import com.sharespace.model.Item;
import com.sharespace.model.User;
import com.sharespace.model.enums.Category;
import com.sharespace.model.enums.Condition;
import com.sharespace.model.enums.ItemStatus;
import com.sharespace.repository.ItemRepository;
import com.sharespace.repository.ReviewRepository;
import com.sharespace.repository.SavedItemRepository;
import com.sharespace.repository.UserRepository;
import com.sharespace.model.SavedItem;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.UUID;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final SavedItemRepository savedItemRepository;

    public ItemService(ItemRepository itemRepository, UserRepository userRepository,
                       ReviewRepository reviewRepository, SavedItemRepository savedItemRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
        this.savedItemRepository = savedItemRepository;
    }

    public List<ItemDto> getItems(String category, String search) {
        List<Item> items;
        if (search != null && !search.isBlank()) {
            if (category != null && !category.isBlank()) {
                items = itemRepository.searchItemsByCategory(search, parseCategory(category), ItemStatus.ACTIVE);
            } else {
                items = itemRepository.searchItems(search, ItemStatus.ACTIVE);
            }
        } else if (category != null && !category.isBlank()) {
            items = itemRepository.findByCategoryAndStatusOrderByCreatedAtDesc(parseCategory(category), ItemStatus.ACTIVE);
        } else {
            items = itemRepository.findByStatusOrderByCreatedAtDesc(ItemStatus.ACTIVE);
        }
        return items.stream().map(this::toDto).toList();
    }

    public ItemDto getItem(UUID id) {
        Item item = itemRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
        return toDto(item);
    }

    public List<ItemDto> getUserItems(UUID userId) {
        return itemRepository.findBySellerIdOrderByCreatedAtDesc(userId).stream().map(this::toDto).toList();
    }

    @Transactional
    public ItemDto createItem(UUID sellerId, CreateItemRequest request) {
        User seller = userRepository.findById(sellerId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Item item = new Item();
        item.setSeller(seller);
        item.setTitle(request.title());
        item.setDescription(request.description());
        item.setPrice(request.price());
        item.setCategory(parseCategory(request.category()));
        item.setCondition(parseCondition(request.condition()));
        item.setImages(request.images() != null ? request.images() : List.of());
        item.setCourseCode(request.courseCode());
        item.setUniversity(request.university() != null ? request.university() : seller.getUniversity());

        Item saved = itemRepository.save(item);
        return toDto(saved);
    }

    @Transactional
    public ItemDto updateItem(UUID id, UUID userId, UpdateItemRequest request) {
        Item item = itemRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        if (!item.getSeller().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }

        if (request.title() != null) item.setTitle(request.title());
        if (request.description() != null) item.setDescription(request.description());
        if (request.price() != null) item.setPrice(request.price());
        if (request.category() != null) item.setCategory(parseCategory(request.category()));
        if (request.condition() != null) item.setCondition(parseCondition(request.condition()));
        if (request.images() != null) item.setImages(request.images());
        if (request.courseCode() != null) item.setCourseCode(request.courseCode());

        Item saved = itemRepository.save(item);
        return toDto(saved);
    }

    @Transactional
    public void updateItemStatus(UUID id, UUID userId, String status) {
        Item item = itemRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        if (!item.getSeller().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }

        item.setStatus(ItemStatus.valueOf(status.toUpperCase()));
        itemRepository.save(item);
    }

    @Transactional
    public void deleteItem(UUID id, UUID userId) {
        Item item = itemRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        if (!item.getSeller().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }

        item.setStatus(ItemStatus.REMOVED);
        itemRepository.save(item);
    }

    @Transactional
    public void incrementViews(UUID id) {
        Item item = itemRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
        item.setViews(item.getViews() + 1);
        itemRepository.save(item);
    }

    @Transactional
    public void saveItem(UUID itemId, UUID userId) {
        if (savedItemRepository.existsByUserIdAndItemId(userId, itemId)) {
            return;
        }
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Item item = itemRepository.findById(itemId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));

        SavedItem savedItem = new SavedItem();
        savedItem.setUser(user);
        savedItem.setItem(item);
        savedItemRepository.save(savedItem);

        item.setSaves(item.getSaves() + 1);
        itemRepository.save(item);
    }

    @Transactional
    public void unsaveItem(UUID itemId, UUID userId) {
        savedItemRepository.deleteByUserIdAndItemId(userId, itemId);
        Item item = itemRepository.findById(itemId).orElse(null);
        if (item != null && item.getSaves() > 0) {
            item.setSaves(item.getSaves() - 1);
            itemRepository.save(item);
        }
    }

    private ItemDto toDto(Item item) {
        Double rating = reviewRepository.getAverageRatingForUser(item.getSeller().getId());
        return ItemDto.from(item, rating);
    }

    private Category parseCategory(String category) {
        return Category.valueOf(category.toUpperCase());
    }

    private Condition parseCondition(String condition) {
        return Condition.valueOf(condition.toUpperCase().replace("-", "_"));
    }
}
