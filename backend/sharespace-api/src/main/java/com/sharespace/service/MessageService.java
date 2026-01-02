package com.sharespace.service;

import com.sharespace.dto.MessageDto;
import com.sharespace.dto.SendMessageRequest;
import com.sharespace.model.Conversation;
import com.sharespace.model.Message;
import com.sharespace.model.User;
import com.sharespace.repository.ConversationRepository;
import com.sharespace.repository.MessageRepository;
import com.sharespace.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.UUID;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;

    public MessageService(MessageRepository messageRepository, ConversationRepository conversationRepository,
                          UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
    }

    public List<MessageDto> getMessages(UUID conversationId, UUID userId) {
        Conversation conversation = conversationRepository.findById(conversationId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Conversation not found"));

        if (!conversation.getParticipant1().getId().equals(userId) &&
            !conversation.getParticipant2().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }

        return messageRepository.findByConversationIdOrderBySentAtAsc(conversationId).stream()
            .map(MessageDto::from)
            .toList();
    }

    @Transactional
    public MessageDto sendMessage(UUID conversationId, UUID senderId, SendMessageRequest request) {
        Conversation conversation = conversationRepository.findById(conversationId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Conversation not found"));

        if (!conversation.getParticipant1().getId().equals(senderId) &&
            !conversation.getParticipant2().getId().equals(senderId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }

        User sender = userRepository.findById(senderId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Message message = new Message();
        message.setConversation(conversation);
        message.setSender(sender);
        message.setContent(request.content());

        Message saved = messageRepository.save(message);
        return MessageDto.from(saved);
    }

    @Transactional
    public void markAsRead(UUID messageId, UUID userId) {
        Message message = messageRepository.findById(messageId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Message not found"));

        if (message.getSender().getId().equals(userId)) {
            return;
        }

        message.setRead(true);
        messageRepository.save(message);
    }

    @Transactional
    public void markAllAsRead(UUID conversationId, UUID userId) {
        messageRepository.markAllAsRead(conversationId, userId);
    }
}
