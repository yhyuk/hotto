package com.hotto.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // `/api` 경로에 대해 CORS 허용
                        .allowedOrigins("https://luckyhotto.shop", "http://localhost:3000") // 허용할 프론트엔드 도메인
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드
                        .allowCredentials(true)
                        .allowedHeaders("*")
                        .exposedHeaders("Authorization");
            }
        };
    }
}

