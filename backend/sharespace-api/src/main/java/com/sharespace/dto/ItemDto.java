package com.sharespace.dto;

import com.sharespace.model.Item;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ItemDto(
    String id,
    String sellerId,
    String sellerName,
    Double sellerRating,
    String title,
    String description,
    BigDecimal price,
    String category,
    String condition,
    String status,
    List<String> images,
    String courseCode,
    String university,
    int views,
    int saves,
    boolean isMentorRecommended,
    LocalDateTime createdAt
) {
    public static ItemDto from(Item item, Double sellerRating) {
        return new ItemDto(
            item.getId().toString(),
            item.getSeller().getId().toString(),
            item.getSeller().getFirstName() + " " + item.getSeller().getLastName(),
            sellerRating,
            item.getTitle(),
            item.getDescription(),
            item.getPrice(),
            item.getCategory().name().toLowerCase(),
            item.getCondition().name().toLowerCase().replace("_", "-"),
            item.getStatus().name().toLowerCase(),
            item.getImages(),
            item.getCourseCode(),
            item.getUniversity(),
            item.getViews(),
            item.getSaves(),
            item.isMentorRecommended(),
            item.getCreatedAt()
        );
    }
}
