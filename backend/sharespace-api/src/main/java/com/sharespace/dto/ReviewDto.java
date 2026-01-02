package com.sharespace.dto;

import com.sharespace.model.Review;
import java.time.LocalDateTime;

public record ReviewDto(
    String id,
    String reviewerId,
    String reviewerName,
    int rating,
    String comment,
    LocalDateTime createdAt
) {
    public static ReviewDto from(Review review) {
        return new ReviewDto(
            review.getId().toString(),
            review.getReviewer().getId().toString(),
            review.getReviewer().getFirstName() + " " + review.getReviewer().getLastName(),
            review.getRating(),
            review.getComment(),
            review.getCreatedAt()
        );
    }
}
