package com.sistemaskill.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sistemaskill.backend.dtos.request.SkillRequestDTO;
import com.sistemaskill.backend.dtos.response.SkillResponseDTO;
import com.sistemaskill.backend.entities.Skill;
import com.sistemaskill.backend.exceptions.ResourceNotFoundException;
import com.sistemaskill.backend.repositories.SkillRepository;

@Service
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    public List<SkillResponseDTO> findAll() {
        return skillRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public SkillResponseDTO findById(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
        "Skill não encontrada"
));

        return toResponse(skill);
    }

    public SkillResponseDTO save(SkillRequestDTO request) {

        Skill skill = new Skill();

        skill.setName(request.name());
        skill.setDescription(request.description());
        skill.setImageUrl(request.imageUrl());

        return toResponse(skillRepository.save(skill));
    }

    public void delete(Long id) {
        skillRepository.deleteById(id);
    }

    private SkillResponseDTO toResponse(Skill skill) {
        return new SkillResponseDTO(
                skill.getId(),
                skill.getName(),
                skill.getDescription(),
                skill.getImageUrl()
        );
    }
}