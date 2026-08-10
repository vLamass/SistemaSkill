package com.sistemaskill.backend.dtos.response;

public record SkillResponseDTO(
        Long id,
        String name,
        String description,
        String imageUrl
) {
}