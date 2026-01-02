package com.sharespace.dto;

import com.sharespace.model.MentorProfile;
import java.util.List;

public record MentorDto(
    String id,
    String userId,
    String name,
    String university,
    String course,
    String bio,
    List<String> expertise,
    Double rating,
    int endorsements,
    int totalAnswers,
    int helpfulAnswers,
    boolean isVerified
) {
    public static MentorDto from(MentorProfile mentor, Double rating) {
        return new MentorDto(
            mentor.getId().toString(),
            mentor.getUser().getId().toString(),
            mentor.getUser().getFirstName() + " " + mentor.getUser().getLastName(),
            mentor.getUser().getUniversity(),
            mentor.getUser().getCourse(),
            mentor.getBio(),
            mentor.getExpertise(),
            rating,
            mentor.getEndorsements(),
            mentor.getTotalAnswers(),
            mentor.getHelpfulAnswers(),
            mentor.isVerified()
        );
    }
}
