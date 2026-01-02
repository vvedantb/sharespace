package com.sharespace.repository;

import com.sharespace.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface AnswerRepository extends JpaRepository<Answer, UUID> {
    List<Answer> findByQuestionIdOrderByCreatedAtAsc(UUID questionId);
    List<Answer> findByMentorIdOrderByCreatedAtDesc(UUID mentorId);
    long countByQuestionId(UUID questionId);
    long countByMentorId(UUID mentorId);
    long countByMentorIdAndHelpfulCountGreaterThan(UUID mentorId, int count);
}
