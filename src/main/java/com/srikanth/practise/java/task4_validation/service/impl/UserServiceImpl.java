package com.srikanth.practise.java.task4_validation.service.impl;

import com.srikanth.practise.java.task4_validation.dto.UserRegistrationDTO;
import com.srikanth.practise.java.task4_validation.entity.User;
import com.srikanth.practise.java.task4_validation.repository.UserRepository;
import com.srikanth.practise.java.task4_validation.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.srikanth.practise.java.task2_exception.exception.ResourceNotFoundException;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User registerUser(UserRegistrationDTO registrationDTO) {
        if (userRepository.existsByEmail(registrationDTO.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = new User();
        user.setName(registrationDTO.getName());
        user.setEmail(registrationDTO.getEmail());
        user.setPassword(registrationDTO.getPassword()); // In real app, encrypt password
        user.setAge(registrationDTO.getAge());
        user.setPhone(registrationDTO.getPhone());

        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }
} 