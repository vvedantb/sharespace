package com.sharespace.controller;

import com.sharespace.dto.AnswerDto;
import com.sharespace.dto.CreateAnswerRequest;
import com.sharespace.dto.CreateQuestionRequest;
import com.sharespace.dto.QuestionDto;
import com.sharespace.service.AnswerService;
import com.sharespace.service.QuestionService;
import com.sharespace.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;
    private final AnswerService answerService;
    private final UserService userService;

    public QuestionController(QuestionService questionService, AnswerService answerService,
                               UserService userService) {
        this.questionService = questionService;
        this.answerService = answerService;
        this.userService = userService;
    }

    @GetMapping
    public List<QuestionDto> getQuestions(@RequestParam(required = false) String search,
                                          @RequestParam(required = false) String category) {
        return questionService.getQuestions(search, category);
    }

    @GetMapping("/{id}")
    public QuestionDto getQuestion(@PathVariable UUID id) {
        return questionService.getQuestion(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public QuestionDto createQuestion(@Valid @RequestBody CreateQuestionRequest request,
                                       @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        return questionService.createQuestion(userId, request);
    }

    @PutMapping("/{id}/status")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateStatus(@PathVariable UUID id, @RequestParam String status,
                             @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        questionService.updateStatus(id, userId, status);
    }

    @GetMapping("/{id}/answers")
    public List<AnswerDto> getAnswers(@PathVariable UUID id) {
        return answerService.getAnswers(id);
    }

    @PostMapping("/{id}/answers")
    @ResponseStatus(HttpStatus.CREATED)
    public AnswerDto createAnswer(@PathVariable UUID id, @Valid @RequestBody CreateAnswerRequest request,
                                   @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        return answerService.createAnswer(id, userId, request);
    }
}
