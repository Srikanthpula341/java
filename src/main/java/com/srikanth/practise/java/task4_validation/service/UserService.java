package com.srikanth.practise.java.task4_validation.service;

import com.srikanth.practise.java.task4_validation.dto.UserRegistrationDTO;
import com.srikanth.practise.java.task4_validation.entity.User;

public interface UserService {
    User registerUser(UserRegistrationDTO registrationDTO);
    User getUserById(Long id);
} 