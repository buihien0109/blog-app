package com.example.blogbackend.controller;

import com.example.blogbackend.entity.User;
import com.example.blogbackend.repository.UserRepository;
import com.example.blogbackend.request.LoginRequest;
import com.example.blogbackend.response.LoginResponse;
import com.example.blogbackend.security.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/public/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;


    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        log.info("Request : {}", request);
        // Tạo đối tượng
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        );

        // Xác thực từ đối tượng
        Authentication authentication = authenticationManager.authenticate(token);
        log.info("authentication : {}", authentication);

        // Nếu không xảy ra exception tức là thông tin hợp lệ
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Tạo token và trả về cho client
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String tokenJwt = jwtTokenUtil.generateToken(userDetails);

        // Thông tin trả về cho Client
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    throw new UsernameNotFoundException("Not found user with email = " + request.getEmail());
                });
        LoginResponse loginResponse = new LoginResponse(user, tokenJwt, true);
        return ResponseEntity.ok(loginResponse);
    }
}
