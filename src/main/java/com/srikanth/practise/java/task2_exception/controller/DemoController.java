package com.srikanth.practise.java.task2_exception.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.srikanth.practise.java.task2_exception.exception.ResourceNotFoundException;
import com.srikanth.practise.java.util.ApiConstants;

@RestController
@RequestMapping(ApiConstants.TASK2_URL)
public class DemoController {

    @GetMapping("/test/{id}")
    public ResponseEntity<String> testException(@PathVariable("id") Long id) {
        if (id == 0) {
            throw new ResourceNotFoundException("Resource", "id", id);
        }
        return ResponseEntity.ok("Success!");
    }
} 