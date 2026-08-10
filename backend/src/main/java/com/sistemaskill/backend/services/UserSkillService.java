package com.sistemaskill.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sistemaskill.backend.dtos.request.UserSkillRequestDTO;
import com.sistemaskill.backend.dtos.response.UserSkillResponseDTO;
import com.sistemaskill.backend.entities.Skill;
import com.sistemaskill.backend.entities.User;
import com.sistemaskill.backend.entities.UserSkill;
import com.sistemaskill.backend.exceptions.ResourceNotFoundException;
import com.sistemaskill.backend.repositories.SkillRepository;
import com.sistemaskill.backend.repositories.UserRepository;
import com.sistemaskill.backend.repositories.UserSkillRepository;

@Service
public class UserSkillService {

    private final UserSkillRepository userSkillRepository;
    private final UserRepository userRepository;
    private final SkillRepository skillRepository;

    public UserSkillService(
            UserSkillRepository userSkillRepository,
            UserRepository userRepository,
            SkillRepository skillRepository) {

        this.userSkillRepository = userSkillRepository;
        this.userRepository = userRepository;
        this.skillRepository = skillRepository;
    }

    public List<UserSkillResponseDTO> findAll() {
        return userSkillRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public UserSkillResponseDTO findById(Long id) {

        UserSkill userSkill = userSkillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
        "Skill do usuário não encontrada"
));

        return toResponse(userSkill);
    }

    public UserSkillResponseDTO save(UserSkillRequestDTO request) {

        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new ResourceNotFoundException(
        "Usuário não encontrado"
));

        Skill skill = skillRepository.findById(request.skillId())
                .orElseThrow(() -> new ResourceNotFoundException(
        "Skill não encontrada"
));

        UserSkill userSkill = new UserSkill();

        userSkill.setUser(user);
        userSkill.setSkill(skill);
        userSkill.setLevel(request.level());

        return toResponse(userSkillRepository.save(userSkill));
    }

    public void delete(Long id) {
        userSkillRepository.deleteById(id);
    }

    private UserSkillResponseDTO toResponse(UserSkill userSkill) {

        return new UserSkillResponseDTO(
                userSkill.getId(),
                userSkill.getUser().getId(),
                userSkill.getSkill().getId(),
                userSkill.getLevel()
        );
    }
}