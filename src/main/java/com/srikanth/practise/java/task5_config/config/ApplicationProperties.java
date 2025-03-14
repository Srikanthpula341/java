package com.srikanth.practise.java.task5_config.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "app")
public class ApplicationProperties {
    private String name;
    private String description;
    private String version;
    private Email email = new Email();
    private Security security = new Security();
    private Cache cache = new Cache();

    @Data
    public static class Email {
        private String from;
        private String supportEmail;
        private boolean enabled;
        private int maxRetries;
    }

    @Data
    public static class Security {
        private String apiKey;
        private long tokenValidityInSeconds;
        private boolean sslEnabled;
        private Cors cors = new Cors();

        @Data
        public static class Cors {
            private boolean enabled;
            private String[] allowedOrigins;
            private String[] allowedMethods;
        }
    }

    @Data
    public static class Cache {
        private boolean enabled;
        private long timeoutInSeconds;
        private int maxSize;
    }
} 