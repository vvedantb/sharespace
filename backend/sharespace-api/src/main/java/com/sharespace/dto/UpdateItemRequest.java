package com.sharespace.dto;

import java.math.BigDecimal;
import java.util.List;

public record UpdateItemRequest(
    String title,
    String description,
    BigDecimal price,
    String category,
    String condition,
    List<String> images,
    String courseCode
) {}
