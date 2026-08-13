package com.sistemaskill.backend.dtos.response;

public record UserSkillResponseDTO(
        Long id,
        Long userId,
        Long skillId,
        Integer level
) {
}