package com.sharespace.controller;

import com.sharespace.dto.ConversationDto;
import com.sharespace.dto.CreateConversationRequest;
import com.sharespace.dto.MessageDto;
import com.sharespace.dto.SendMessageRequest;
import com.sharespace.service.ConversationService;
import com.sharespace.service.MessageService;
import com.sharespace.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationService conversationService;
    private final MessageService messageService;
    private final UserService userService;

    public ConversationController(ConversationService conversationService, MessageService messageService,
                                   UserService userService) {
        this.conversationService = conversationService;
        this.messageService = messageService;
        this.userService = userService;
    }

    @GetMapping
    public List<ConversationDto> getConversations(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        return conversationService.getUserConversations(userId);
    }

    @GetMapping("/{id}")
    public ConversationDto getConversation(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        return conversationService.getConversation(id, userId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ConversationDto createConversation(@Valid @RequestBody CreateConversationRequest request,
                                               @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        return conversationService.createConversation(userId, request);
    }

    @GetMapping("/{id}/messages")
    public List<MessageDto> getMessages(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        return messageService.getMessages(id, userId);
    }

    @PostMapping("/{id}/messages")
    @ResponseStatus(HttpStatus.CREATED)
    public MessageDto sendMessage(@PathVariable UUID id, @Valid @RequestBody SendMessageRequest request,
                                   @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        return messageService.sendMessage(id, userId, request);
    }

    @PutMapping("/{id}/messages/read")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void markAllAsRead(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        messageService.markAllAsRead(id, userId);
    }
}
