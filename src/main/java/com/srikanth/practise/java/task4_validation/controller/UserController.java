package com.srikanth.practise.java.task4_validation.controller;

import com.srikanth.practise.java.task4_validation.dto.UserRegistrationDTO;
import com.srikanth.practise.java.task4_validation.entity.User;
import com.srikanth.practise.java.task4_validation.service.UserService;
import com.srikanth.practise.java.util.ApiConstants;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiConstants.TASK4_URL)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    public ResponseEntity<User> registerUser(@Valid @RequestBody UserRegistrationDTO registrationDTO) {
        return ResponseEntity.ok(userService.registerUser(registrationDTO));
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
} 