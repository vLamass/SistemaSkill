package com.sistemaskill.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sistemaskill.backend.dtos.request.LoginRequestDTO;
import com.sistemaskill.backend.dtos.request.UserRequestDTO;
import com.sistemaskill.backend.dtos.response.LoginResponseDTO;
import com.sistemaskill.backend.dtos.response.UserResponseDTO;
import com.sistemaskill.backend.services.AuthService;
import com.sistemaskill.backend.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(
            @Valid @RequestBody UserRequestDTO request) {

        UserResponseDTO response = userService.save(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO request) {

        LoginResponseDTO response = authService.login(request);

        return ResponseEntity.ok(response);
    }

}