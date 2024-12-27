package com.backend.educonsultancy_backend.controllers;


import com.backend.educonsultancy_backend.auth.entities.RefreshToken;
import com.backend.educonsultancy_backend.auth.entities.User;
import com.backend.educonsultancy_backend.auth.services.AuthService;
import com.backend.educonsultancy_backend.auth.services.JwtService;
import com.backend.educonsultancy_backend.auth.services.RefreshTokenService;
import com.backend.educonsultancy_backend.auth.utils.AuthResponse;
import com.backend.educonsultancy_backend.auth.utils.LoginRequest;
import com.backend.educonsultancy_backend.auth.utils.RefreshTokenRequest;
import com.backend.educonsultancy_backend.auth.utils.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {

    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, RefreshTokenService refreshTokenService, JwtService jwtService) {
        this.authService = authService;
        this.refreshTokenService = refreshTokenService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.ok(authService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {

        RefreshToken refreshToken = refreshTokenService.verifyRefreshToken(refreshTokenRequest.getRefreshToken());
        User user = refreshToken.getUser();

        String accessToken = jwtService.generateToken(user);

        return ResponseEntity.ok(AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getRefreshToken())
                .build());
    }

    //=============== CHANGED CODE (NEW METHOD ADDED) =====================
    @GetMapping("/me")
    public User getAuthenticatedUser() {
        // Get the current user's email from the authentication context
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        // Fetch user details using the email
        User user = authService.getUserDetails(username);
        return user;
    }
    //======================================================================
}