package com.sistemaskill.backend.dtos.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequestDTO(

        @NotBlank(message = "O login é obrigatório")
        @Size(max = 100, message = "O login deve ter no máximo 100 caracteres")
        String login,

        @NotBlank(message = "A senha é obrigatória")
        @Size(min = 6, max = 255, message = "A senha deve ter entre 6 e 255 caracteres")
        String password

) {
}