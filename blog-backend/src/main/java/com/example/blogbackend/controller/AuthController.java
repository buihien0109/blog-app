package com.example.blogbackend.controller;

import com.example.blogbackend.model.request.LoginRequest;
import com.example.blogbackend.model.response.AuthResponse;
import com.example.blogbackend.model.response.ErrorMessage;
import com.example.blogbackend.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/public/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse authResponse = authService.login(request);
            return ResponseEntity.ok(authResponse);
        } catch (AuthenticationException e) {
            log.error("Error: {}", e.getMessage());
            ErrorMessage error = new ErrorMessage(HttpStatus.BAD_REQUEST.value(), "Email hoặc mật khẩu không đúng");
            return ResponseEntity.badRequest().body(error);
        }
    }
}
