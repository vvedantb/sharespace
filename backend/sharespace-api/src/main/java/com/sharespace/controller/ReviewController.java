package com.sharespace.controller;

import com.sharespace.dto.CreateReviewRequest;
import com.sharespace.dto.ReviewDto;
import com.sharespace.service.ReviewService;
import com.sharespace.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/users/{userId}/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;

    public ReviewController(ReviewService reviewService, UserService userService) {
        this.reviewService = reviewService;
        this.userService = userService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReviewDto createReview(@PathVariable UUID userId, @Valid @RequestBody CreateReviewRequest request,
                                   @AuthenticationPrincipal Jwt jwt) {
        UUID reviewerId = UUID.fromString(userService.getUserByCognitoId(jwt.getSubject()).id());
        return reviewService.createReview(userId, reviewerId, request);
    }
}
