package com.sistemaskill.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemaskill.backend.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

     Optional<User> findByLogin(String login);
}