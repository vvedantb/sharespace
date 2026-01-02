package com.sharespace.dto;

import java.time.LocalDateTime;

public record ConversationDto(
    String id,
    String participantId,
    String participantName,
    String lastMessage,
    LocalDateTime lastMessageTime,
    boolean unread,
    String itemId,
    String itemTitle
) {}
