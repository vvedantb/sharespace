package com.sharespace.controller;

import com.sharespace.dto.ItemDto;
import com.sharespace.dto.ReviewDto;
import com.sharespace.dto.UpdateUserRequest;
import com.sharespace.dto.UserDto;
import com.sharespace.service.ItemService;
import com.sharespace.service.ReviewService;
import com.sharespace.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final ItemService itemService;
    private final ReviewService reviewService;

    public UserController(UserService userService, ItemService itemService, ReviewService reviewService) {
        this.userService = userService;
        this.itemService = itemService;
        this.reviewService = reviewService;
    }

    @GetMapping("/me")
    public UserDto getCurrentUser(@AuthenticationPrincipal Jwt jwt) {
        return userService.getUserByCognitoId(jwt.getSubject());
    }

    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable UUID id) {
        return userService.getUser(id);
    }

    @PutMapping("/{id}")
    public UserDto updateUser(@PathVariable UUID id, @RequestBody UpdateUserRequest request,
                              @AuthenticationPrincipal Jwt jwt) {
        return userService.updateUser(id, request);
    }

    @GetMapping("/{id}/listings")
    public List<ItemDto> getUserListings(@PathVariable UUID id) {
        return itemService.getUserItems(id);
    }

    @GetMapping("/{id}/reviews")
    public List<ReviewDto> getUserReviews(@PathVariable UUID id) {
        return reviewService.getReviewsForUser(id);
    }
}
