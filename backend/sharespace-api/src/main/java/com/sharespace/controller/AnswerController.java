package com.sharespace.controller;

import com.sharespace.service.AnswerService;
import com.sharespace.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    private final AnswerService answerService;
    private final UserService userService;

    public AnswerController(AnswerService answerService, UserService userService) {
        this.answerService = answerService;
        this.userService = userService;
    }

    @PutMapping("/{id}/helpful")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void markHelpful(@PathVariable UUID id) {
        answerService.markHelpful(id);
    }

    @PutMapping("/{id}/endorse")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void endorseAnswer(@PathVariable UUID id, @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        answerService.endorseAnswer(id, userId);
    }
}
