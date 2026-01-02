package com.sharespace.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.List;

public record CreateItemRequest(
    @NotBlank String title,
    String description,
    @NotNull @Positive BigDecimal price,
    @NotBlank String category,
    @NotBlank String condition,
    List<String> images,
    String courseCode,
    String university
) {}
