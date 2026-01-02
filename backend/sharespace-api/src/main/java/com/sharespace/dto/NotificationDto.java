package com.sharespace.dto;

import com.sharespace.model.Notification;
import java.time.LocalDateTime;

public record NotificationDto(
    String id,
    String type,
    String title,
    String description,
    String link,
    boolean isRead,
    LocalDateTime createdAt
) {
    public static NotificationDto from(Notification notification) {
        return new NotificationDto(
            notification.getId().toString(),
            notification.getType().name().toLowerCase(),
            notification.getTitle(),
            notification.getDescription(),
            notification.getLink(),
            notification.isRead(),
            notification.getCreatedAt()
        );
    }
}
