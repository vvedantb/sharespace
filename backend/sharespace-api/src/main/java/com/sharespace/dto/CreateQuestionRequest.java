package com.sharespace.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateQuestionRequest(
    @NotBlank String title,
    @NotBlank String content,
    @NotBlank String category,
    String courseCode
) {}
