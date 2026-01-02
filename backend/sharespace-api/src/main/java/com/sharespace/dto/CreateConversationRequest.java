package com.sharespace.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateConversationRequest(
    @NotBlank String participantId,
    String itemId,
    String initialMessage
) {}
