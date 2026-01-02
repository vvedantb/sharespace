package com.sharespace.dto;

import com.sharespace.model.User;
import java.time.LocalDateTime;

public record UserDto(
    String id,
    String email,
    String firstName,
    String lastName,
    String username,
    String university,
    String course,
    Integer yearOfStudy,
    String bio,
    boolean isVerified,
    boolean isMentor,
    Double rating,
    long itemsListed,
    long itemsSold,
    LocalDateTime createdAt
) {
    public static UserDto from(User user, boolean isMentor, Double rating, long itemsListed, long itemsSold) {
        return new UserDto(
            user.getId().toString(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getUsername(),
            user.getUniversity(),
            user.getCourse(),
            user.getYearOfStudy(),
            user.getBio(),
            user.isVerified(),
            isMentor,
            rating,
            itemsListed,
            itemsSold,
            user.getCreatedAt()
        );
    }
}
