package com.srikanth.practise.java.task5_config.controller;

import com.srikanth.practise.java.task5_config.service.ConfigurationService;
import com.srikanth.practise.java.util.ApiConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(ApiConstants.TASK5_URL)
@RequiredArgsConstructor
public class ConfigController {

    private final ConfigurationService configurationService;

    @GetMapping("/config")
    public ResponseEntity<Map<String, Object>> getConfig() {
        return ResponseEntity.ok(configurationService.getApplicationConfig());
    }
} 