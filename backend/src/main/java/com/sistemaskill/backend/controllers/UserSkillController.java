package com.sistemaskill.backend.controllers;

import com.sistemaskill.backend.dtos.request.UserSkillRequestDTO;
import com.sistemaskill.backend.dtos.response.UserSkillResponseDTO;
import com.sistemaskill.backend.services.UserSkillService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userSkillService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
