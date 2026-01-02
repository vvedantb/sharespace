package com.sharespace.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record CreateUserRequest(
    @NotBlank String cognitoId,
    @NotBlank @Email String email,
    @NotBlank String firstName,
    @NotBlank String lastName,
    String university
) {}
