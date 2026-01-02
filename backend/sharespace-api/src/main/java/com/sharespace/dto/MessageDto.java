package com.sharespace.dto;

import com.sharespace.model.Message;
import java.time.LocalDateTime;

public record MessageDto(
    String id,
    String conversationId,
    String senderId,
    String content,
    boolean isRead,
    LocalDateTime sentAt
) {
    public static MessageDto from(Message message) {
        return new MessageDto(
            message.getId().toString(),
            message.getConversation().getId().toString(),
            message.getSender().getId().toString(),
            message.getContent(),
            message.isRead(),
            message.getSentAt()
        );
    }
}
