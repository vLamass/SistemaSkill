package com.sistemaskill.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemaskill.backend.entities.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long> {
}