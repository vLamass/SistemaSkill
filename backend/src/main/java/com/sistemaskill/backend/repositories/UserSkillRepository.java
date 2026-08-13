package com.sistemaskill.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemaskill.backend.entities.UserSkill;

public interface UserSkillRepository extends JpaRepository<UserSkill, Long> {
}