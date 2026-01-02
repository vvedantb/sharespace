package com.sharespace.service;

import com.sharespace.dto.CreateQuestionRequest;
import com.sharespace.dto.QuestionDto;
import com.sharespace.model.Question;
import com.sharespace.model.User;
import com.sharespace.model.enums.QuestionCategory;
import com.sharespace.model.enums.QuestionStatus;
import com.sharespace.repository.AnswerRepository;
import com.sharespace.repository.QuestionRepository;
import com.sharespace.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.UUID;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;

    public QuestionService(QuestionRepository questionRepository, AnswerRepository answerRepository,
                           UserRepository userRepository) {
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
        this.userRepository = userRepository;
    }

    public List<QuestionDto> getQuestions(String search, String category) {
        List<Question> questions;
        if (search != null && !search.isBlank()) {
            questions = questionRepository.searchQuestions(search);
        } else if (category != null && !category.isBlank()) {
            questions = questionRepository.findByCategoryOrderByCreatedAtDesc(parseCategory(category));
        } else {
            questions = questionRepository.findAllByOrderByCreatedAtDesc();
        }
        return questions.stream().map(this::toDto).toList();
    }

    public QuestionDto getQuestion(UUID id) {
        Question question = questionRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found"));
        return toDto(question);
    }

    @Transactional
    public QuestionDto createQuestion(UUID askerId, CreateQuestionRequest request) {
        User asker = userRepository.findById(askerId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Question question = new Question();
        question.setAsker(asker);
        question.setTitle(request.title());
        question.setContent(request.content());
        question.setCategory(parseCategory(request.category()));
        question.setCourseCode(request.courseCode());

        Question saved = questionRepository.save(question);
        return toDto(saved);
    }

    @Transactional
    public void updateStatus(UUID id, UUID userId, String status) {
        Question question = questionRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found"));

        if (!question.getAsker().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized");
        }

        question.setStatus(QuestionStatus.valueOf(status.toUpperCase()));
        questionRepository.save(question);
    }

    private QuestionDto toDto(Question question) {
        long answerCount = answerRepository.countByQuestionId(question.getId());
        return QuestionDto.from(question, answerCount);
    }

    private QuestionCategory parseCategory(String category) {
        return QuestionCategory.valueOf(category.toUpperCase().replace("-", "_"));
    }
}
