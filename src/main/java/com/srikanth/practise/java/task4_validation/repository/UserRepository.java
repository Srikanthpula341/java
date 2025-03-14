package com.srikanth.practise.java.task4_validation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.srikanth.practise.java.task4_validation.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
} 