package com.sistemaskill.backend.services;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sistemaskill.backend.dtos.request.UserRequestDTO;
import com.sistemaskill.backend.dtos.response.UserResponseDTO;
import com.sistemaskill.backend.entities.User;
import com.sistemaskill.backend.exceptions.ResourceNotFoundException;
import com.sistemaskill.backend.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
}

    public List<UserResponseDTO> findAll() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponseDTO(
                        user.getId(),
                        user.getLogin()
                ))
                .toList();
    }

    public UserResponseDTO findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
        "Usuário não encontrado"
));

        return new UserResponseDTO(
                user.getId(),
                user.getLogin()
        );
    }

    public UserResponseDTO save(UserRequestDTO request) {

        User user = new User();

        user.setLogin(request.login());
        user.setPassword(
        passwordEncoder.encode(request.password())
);

        User savedUser = userRepository.save(user);

        return new UserResponseDTO(
                savedUser.getId(),
                savedUser.getLogin()
        );
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}