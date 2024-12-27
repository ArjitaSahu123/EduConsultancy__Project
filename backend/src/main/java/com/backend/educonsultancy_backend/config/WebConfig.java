//============================ CORRECT CODE =====================================================
package com.backend.educonsultancy_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Enable CORS for all endpoints
        registry.addMapping("/**") // Apply to all URLs
                .allowedOrigins("http://localhost:3000") // Allow requests from this frontend (localhost:3000)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow specific HTTP methods
                .allowedHeaders("*")// Allow all headers
                .allowCredentials(true); // Allow credentials like cookies
    }
}
//===============================================================================================


//package com.backend.educonsultancy_backend.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//import java.util.List;
//
//@Configuration
//public class WebConfig {
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        // Set allowed origins
//        configuration.setAllowedOrigins(List.of("https://app-backend.com", "http://localhost:3000"));
//        // Allow credentials (cookies, authorization headers, etc.)
//        configuration.setAllowCredentials(true);
//        // Set allowed HTTP methods
//        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
//        // Set allowed headers
//        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
//        // Set exposed headers
//        configuration.setExposedHeaders(List.of("Authorization"));
//        // Set the max age for pre-flight requests (in seconds)
//        configuration.setMaxAge(3600L);
//
//        // Apply the CORS configuration globally
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration); // Apply to all paths
//        return source;
//    }
//}