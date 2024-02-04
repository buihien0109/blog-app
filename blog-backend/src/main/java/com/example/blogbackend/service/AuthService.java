package com.example.blogbackend.service;

import com.example.blogbackend.entity.User;
import com.example.blogbackend.exception.ResourceNotFoundException;
import com.example.blogbackend.model.dto.UserDto;
import com.example.blogbackend.model.mapper.UserMapper;
import com.example.blogbackend.model.request.LoginRequest;
import com.example.blogbackend.model.response.AuthResponse;
import com.example.blogbackend.repository.UserRepository;
import com.example.blogbackend.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtUtils jwtUtils;

    public AuthResponse login(LoginRequest request) throws AuthenticationException {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        );

        Authentication authentication = authenticationManager.authenticate(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Tạo token
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String tokenJwt = jwtUtils.generateToken(userDetails);

        // TODO: Tạo refresh token

        // Thông tin trả về cho Client
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user có email = " + request.getEmail()));
        UserDto userDto = userMapper.toUserDto(user);

        return AuthResponse.builder()
                .user(userDto)
                .accessToken(tokenJwt)
                .refreshToken(null)
                .isAuthenticated(true)
                .build();
    }
}
