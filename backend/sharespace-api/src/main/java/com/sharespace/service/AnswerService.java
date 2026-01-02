package com.sharespace.service;

import com.sharespace.dto.AnswerDto;
import com.sharespace.dto.CreateAnswerRequest;
import com.sharespace.model.Answer;
import com.sharespace.model.MentorProfile;
import com.sharespace.model.Question;
import com.sharespace.model.User;
import com.sharespace.model.enums.QuestionStatus;
import com.sharespace.repository.AnswerRepository;
import com.sharespace.repository.MentorProfileRepository;
import com.sharespace.repository.QuestionRepository;
import com.sharespace.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.UUID;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final MentorProfileRepository mentorProfileRepository;

    public AnswerService(AnswerRepository answerRepository, QuestionRepository questionRepository,
                         UserRepository userRepository, MentorProfileRepository mentorProfileRepository) {
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.mentorProfileRepository = mentorProfileRepository;
    }

    public List<AnswerDto> getAnswers(UUID questionId) {
        return answerRepository.findByQuestionIdOrderByCreatedAtAsc(questionId).stream()
            .map(AnswerDto::from)
            .toList();
    }

    @Transactional
    public AnswerDto createAnswer(UUID questionId, UUID mentorId, CreateAnswerRequest request) {
        Question question = questionRepository.findById(questionId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found"));

        User mentor = userRepository.findById(mentorId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Answer answer = new Answer();
        answer.setQuestion(question);
        answer.setMentor(mentor);
        answer.setContent(request.content());

        Answer saved = answerRepository.save(answer);

        if (question.getStatus() == QuestionStatus.OPEN) {
            question.setStatus(QuestionStatus.ANSWERED);
            questionRepository.save(question);
        }

        mentorProfileRepository.findByUserId(mentorId).ifPresent(profile -> {
            profile.setTotalAnswers(profile.getTotalAnswers() + 1);
            mentorProfileRepository.save(profile);
        });

        return AnswerDto.from(saved);
    }

    @Transactional
    public void markHelpful(UUID answerId) {
        Answer answer = answerRepository.findById(answerId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Answer not found"));

        answer.setHelpfulCount(answer.getHelpfulCount() + 1);
        answerRepository.save(answer);

        mentorProfileRepository.findByUserId(answer.getMentor().getId()).ifPresent(profile -> {
            profile.setHelpfulAnswers(profile.getHelpfulAnswers() + 1);
            mentorProfileRepository.save(profile);
        });
    }

    @Transactional
    public void endorseAnswer(UUID answerId, UUID mentorId) {
        Answer answer = answerRepository.findById(answerId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Answer not found"));

        if (!mentorProfileRepository.existsByUserId(mentorId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only mentors can endorse");
        }

        answer.setEndorsed(true);
        answerRepository.save(answer);

        mentorProfileRepository.findByUserId(answer.getMentor().getId()).ifPresent(profile -> {
            profile.setEndorsements(profile.getEndorsements() + 1);
            mentorProfileRepository.save(profile);
        });
    }
}
