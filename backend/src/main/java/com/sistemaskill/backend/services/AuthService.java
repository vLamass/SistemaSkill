package com.sistemaskill.backend.services;

import java.time.Instant;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.sistemaskill.backend.dtos.request.LoginRequestDTO;
import com.sistemaskill.backend.dtos.response.LoginResponseDTO;
import com.sistemaskill.backend.entities.User;
import com.sistemaskill.backend.exceptions.UnauthorizedException;
import com.sistemaskill.backend.repositories.UserRepository;

@Service
public class AuthService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtEncoder jwtEncoder;

        public AuthService(
                        UserRepository userRepository,
                        PasswordEncoder passwordEncoder, JwtEncoder jwtEncoder) {

                this.userRepository = userRepository;
                this.passwordEncoder = passwordEncoder;
                this.jwtEncoder = jwtEncoder;
        }

        public LoginResponseDTO login(LoginRequestDTO request) {

                User user = userRepository.findByLogin(request.login())
                                .orElseThrow(() -> new UnauthorizedException("Login ou senha inválidos"));

                boolean passwordMatches = passwordEncoder.matches(
                                request.password(),
                                user.getPassword());

                if (!passwordMatches) {
                        throw new UnauthorizedException("Login ou senha inválidos");
                }

                Instant now = Instant.now();

                JwtClaimsSet claims = JwtClaimsSet.builder()
                                .issuer("sistema-skill")
                                .subject(user.getLogin())
                                .issuedAt(now)
                                .expiresAt(now.plusSeconds(3600))
                                .claim("userId", user.getId())
                                .build();

                String token = jwtEncoder
                                .encode(JwtEncoderParameters.from(claims))
                                .getTokenValue();

                return new LoginResponseDTO(token);
        }
}