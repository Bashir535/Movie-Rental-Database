package com.backend.movierental.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


// define explicit cross-origin access rules for the backend. It restricts which frontend domain may send requests
// and which HTTP methods/headers are permitted.
// This centralizes and enforces CORS policy for all controllers in the application.
@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

    @Value("${react.url}")
    String frontend;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(frontend) // frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*")
                .exposedHeaders("*");
    }
}
