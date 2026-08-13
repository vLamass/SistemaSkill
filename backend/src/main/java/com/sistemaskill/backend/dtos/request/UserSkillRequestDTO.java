package com.sistemaskill.backend.dtos.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UserSkillRequestDTO(

        @NotNull(message = "O usuário é obrigatório")
        Long userId,

        @NotNull(message = "A skill é obrigatória")
        Long skillId,

        @NotNull(message = "O nível é obrigatório")
        @Min(value = 1, message = "O nível mínimo é 1")
        @Max(value = 5, message = "O nível máximo é 5")
        Integer level

) {
}