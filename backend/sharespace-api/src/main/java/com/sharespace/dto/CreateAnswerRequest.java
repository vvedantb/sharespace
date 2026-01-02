package com.sharespace.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateAnswerRequest(
    @NotBlank String content
) {}
