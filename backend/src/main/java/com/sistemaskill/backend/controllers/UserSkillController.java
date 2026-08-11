package com.sistemaskill.backend.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sistemaskill.backend.dtos.request.UserSkillRequestDTO;
import com.sistemaskill.backend.dtos.response.UserSkillResponseDTO;
import com.sistemaskill.backend.services.UserSkillService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user-skills")
public class UserSkillController {

    private final UserSkillService userSkillService;

    public UserSkillController(UserSkillService userSkillService) {
        this.userSkillService = userSkillService;
    }

    @GetMapping
    public ResponseEntity<List<UserSkillResponseDTO>> findAll() {
        return ResponseEntity.ok(userSkillService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserSkillResponseDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(userSkillService.findById(id));
    }

    @PostMapping
    public ResponseEntity<UserSkillResponseDTO> save(
            @Valid @RequestBody UserSkillRequestDTO request) {

        return ResponseEntity.ok(userSkillService.save(request));
    }

    @PutMapping("/{id}")
public ResponseEntity<UserSkillResponseDTO> updateLevel(
        @PathVariable Long id,
        @RequestParam Integer level) {

    return ResponseEntity.ok(
            userSkillService.updateLevel(id, level)
    );
}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userSkillService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
