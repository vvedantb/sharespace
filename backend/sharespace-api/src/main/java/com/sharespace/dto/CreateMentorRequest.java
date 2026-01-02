package com.sharespace.dto;

import java.util.List;

public record CreateMentorRequest(
    String bio,
    List<String> expertise
) {}
