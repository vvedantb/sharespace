package com.sharespace.repository;

import com.sharespace.model.Question;
import com.sharespace.model.enums.QuestionCategory;
import com.sharespace.model.enums.QuestionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.UUID;

public interface QuestionRepository extends JpaRepository<Question, UUID> {
    List<Question> findByAskerIdOrderByCreatedAtDesc(UUID askerId);
    List<Question> findByStatusOrderByCreatedAtDesc(QuestionStatus status);
    List<Question> findByCategoryOrderByCreatedAtDesc(QuestionCategory category);
    List<Question> findAllByOrderByCreatedAtDesc();

    @Query("SELECT q FROM Question q WHERE " +
           "LOWER(q.title) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(q.content) LIKE LOWER(CONCAT('%', :search, '%'))")
    List<Question> searchQuestions(@Param("search") String search);
}
