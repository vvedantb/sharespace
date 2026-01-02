package com.sharespace.service;

import com.sharespace.dto.ConversationDto;
import com.sharespace.dto.CreateConversationRequest;
import com.sharespace.model.Conversation;
import com.sharespace.model.Item;
import com.sharespace.model.Message;
import com.sharespace.model.User;
import com.sharespace.repository.ConversationRepository;
import com.sharespace.repository.ItemRepository;
import com.sharespace.repository.MessageRepository;
import com.sharespace.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    public ConversationService(ConversationRepository conversationRepository, MessageRepository messageRepository,
                               UserRepository userRepository, ItemRepository itemRepository) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
    }

    public List<ConversationDto> getUserConversations(UUID userId) {
        return conversationRepository.findByUserId(userId).stream()
            .map(c -> toDto(c, userId))
            .toList();
    }

    public ConversationDto getConversation(UUID conversationId, UUID userId) {
        Conversation conversation = conversationRepository.findById(conversationId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Conversation not found"));

        if (!conversation.getParticipant1().getId().equals(userId) &&
            !conversation.getParticipant2().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }

        return toDto(conversation, userId);
    }

    @Transactional
    public ConversationDto createConversation(UUID userId, CreateConversationRequest request) {
        UUID participantId = UUID.fromString(request.participantId());
        UUID itemId = request.itemId() != null ? UUID.fromString(request.itemId()) : null;

        Optional<Conversation> existing = itemId != null
            ? conversationRepository.findByParticipantsAndItem(userId, participantId, itemId)
            : conversationRepository.findByParticipants(userId, participantId);

        if (existing.isPresent()) {
            return toDto(existing.get(), userId);
        }

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        User participant = userRepository.findById(participantId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Participant not found"));

        Conversation conversation = new Conversation();
        conversation.setParticipant1(user);
        conversation.setParticipant2(participant);

        if (itemId != null) {
            Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found"));
            conversation.setItem(item);
        }

        Conversation saved = conversationRepository.save(conversation);

        if (request.initialMessage() != null && !request.initialMessage().isBlank()) {
            Message message = new Message();
            message.setConversation(saved);
            message.setSender(user);
            message.setContent(request.initialMessage());
            messageRepository.save(message);
        }

        return toDto(saved, userId);
    }

    private ConversationDto toDto(Conversation conversation, UUID currentUserId) {
        User otherParticipant = conversation.getParticipant1().getId().equals(currentUserId)
            ? conversation.getParticipant2()
            : conversation.getParticipant1();

        Message lastMessage = messageRepository.findTopByConversationIdOrderBySentAtDesc(conversation.getId())
            .orElse(null);

        boolean hasUnread = messageRepository.hasUnreadMessages(conversation.getId(), currentUserId);

        return new ConversationDto(
            conversation.getId().toString(),
            otherParticipant.getId().toString(),
            otherParticipant.getFirstName() + " " + otherParticipant.getLastName(),
            lastMessage != null ? lastMessage.getContent() : null,
            lastMessage != null ? lastMessage.getSentAt() : conversation.getCreatedAt(),
            hasUnread,
            conversation.getItem() != null ? conversation.getItem().getId().toString() : null,
            conversation.getItem() != null ? conversation.getItem().getTitle() : null
        );
    }
}
