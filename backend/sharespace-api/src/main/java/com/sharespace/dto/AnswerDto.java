package com.sharespace.dto;

import com.sharespace.model.Answer;
import java.time.LocalDateTime;

public record AnswerDto(
    String id,
    String questionId,
    String mentorId,
    String mentorName,
    String content,
    int helpfulCount,
    boolean isEndorsed,
    LocalDateTime createdAt
) {
    public static AnswerDto from(Answer answer) {
        return new AnswerDto(
            answer.getId().toString(),
            answer.getQuestion().getId().toString(),
            answer.getMentor().getId().toString(),
            answer.getMentor().getFirstName() + " " + answer.getMentor().getLastName(),
            answer.getContent(),
            answer.getHelpfulCount(),
            answer.isEndorsed(),
            answer.getCreatedAt()
        );
    }
}
