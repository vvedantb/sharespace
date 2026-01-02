package com.sharespace.dto;

public record UpdateUserRequest(
    String firstName,
    String lastName,
    String username,
    String university,
    String course,
    Integer yearOfStudy,
    String bio
) {}
