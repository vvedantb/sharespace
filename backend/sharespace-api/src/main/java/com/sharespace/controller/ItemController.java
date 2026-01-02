package com.sharespace.controller;

import com.sharespace.dto.CreateItemRequest;
import com.sharespace.dto.ItemDto;
import com.sharespace.dto.UpdateItemRequest;
import com.sharespace.service.ItemService;
import com.sharespace.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;
    private final UserService userService;

    public ItemController(ItemService itemService, UserService userService) {
        this.itemService = itemService;
        this.userService = userService;
    }

    @GetMapping
    public List<ItemDto> getItems(@RequestParam(required = false) String category,
                                  @RequestParam(required = false) String search) {
        return itemService.getItems(category, search);
    }

    @GetMapping("/{id}")
    public ItemDto getItem(@PathVariable UUID id) {
        return itemService.getItem(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ItemDto createItem(@Valid @RequestBody CreateItemRequest request,
                              @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        return itemService.createItem(userId, request);
    }

    @PutMapping("/{id}")
    public ItemDto updateItem(@PathVariable UUID id, @RequestBody UpdateItemRequest request,
                              @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        return itemService.updateItem(id, userId, request);
    }

    @PutMapping("/{id}/status")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateItemStatus(@PathVariable UUID id, @RequestParam String status,
                                 @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        itemService.updateItemStatus(id, userId, status);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItem(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        itemService.deleteItem(id, userId);
    }

    @PostMapping("/{id}/view")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void incrementViews(@PathVariable UUID id) {
        itemService.incrementViews(id);
    }

    @PostMapping("/{id}/save")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void saveItem(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        itemService.saveItem(id, userId);
    }

    @DeleteMapping("/{id}/save")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void unsaveItem(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        itemService.unsaveItem(id, userId);
    }
}
