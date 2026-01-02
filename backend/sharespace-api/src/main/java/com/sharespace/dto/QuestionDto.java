package com.sharespace.dto;

import com.sharespace.model.Question;
import java.time.LocalDateTime;

public record QuestionDto(
    String id,
    String askerId,
    String askerName,
    String title,
    String content,
    String category,
    String courseCode,
    String status,
    long answerCount,
    LocalDateTime createdAt
) {
    public static QuestionDto from(Question question, long answerCount) {
        return new QuestionDto(
            question.getId().toString(),
            question.getAsker().getId().toString(),
            question.getAsker().getFirstName() + " " + question.getAsker().getLastName(),
            question.getTitle(),
            question.getContent(),
            question.getCategory().name().toLowerCase().replace("_", "-"),
            question.getCourseCode(),
            question.getStatus().name().toLowerCase(),
            answerCount,
            question.getCreatedAt()
        );
    }
}
