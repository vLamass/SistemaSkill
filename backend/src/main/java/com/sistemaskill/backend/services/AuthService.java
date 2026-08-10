package com.sistemaskill.backend.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sistemaskill.backend.dtos.request.LoginRequestDTO;
import com.sistemaskill.backend.dtos.response.UserResponseDTO;
import com.sistemaskill.backend.entities.User;
import com.sistemaskill.backend.exceptions.UnauthorizedException;
import com.sistemaskill.backend.repositories.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponseDTO login(LoginRequestDTO request) {

        User user = userRepository.findByLogin(request.login())
                .orElseThrow(() ->new UnauthorizedException("Login ou senha inválidos"));

        boolean passwordMatches = passwordEncoder.matches(
                request.password(),
                user.getPassword()
        );

        if (!passwordMatches) {
                throw new UnauthorizedException("Login ou senha inválidos");
        }

        return new UserResponseDTO(
                user.getId(),
                user.getLogin()
        );
    }
}