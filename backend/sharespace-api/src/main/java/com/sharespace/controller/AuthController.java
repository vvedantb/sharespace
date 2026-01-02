package com.sharespace.controller;

import com.sharespace.dto.CreateUserRequest;
import com.sharespace.dto.UserDto;
import com.sharespace.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto register(@Valid @RequestBody CreateUserRequest request) {
        return userService.createUser(request);
    }
}
