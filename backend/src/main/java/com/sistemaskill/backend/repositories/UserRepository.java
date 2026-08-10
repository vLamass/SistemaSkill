package com.sistemaskill.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemaskill.backend.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
}