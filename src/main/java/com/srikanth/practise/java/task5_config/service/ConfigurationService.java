package com.srikanth.practise.java.task5_config.service;

import com.srikanth.practise.java.task5_config.config.ApplicationProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ConfigurationService {
    
    private final ApplicationProperties applicationProperties;

    public Map<String, Object> getApplicationConfig() {
        Map<String, Object> config = new HashMap<>();
        
        // Application info
        config.put("name", applicationProperties.getName());
        config.put("description", applicationProperties.getDescription());
        config.put("version", applicationProperties.getVersion());
        
        // Email settings
        config.put("emailEnabled", applicationProperties.getEmail().isEnabled());
        config.put("supportEmail", applicationProperties.getEmail().getSupportEmail());
        
        // Security settings (excluding sensitive data)
        config.put("sslEnabled", applicationProperties.getSecurity().isSslEnabled());
        config.put("corsEnabled", applicationProperties.getSecurity().getCors().isEnabled());
        
        // Cache settings
        config.put("cacheEnabled", applicationProperties.getCache().isEnabled());
        config.put("cacheTimeout", applicationProperties.getCache().getTimeoutInSeconds());
        
        return config;
    }
} 