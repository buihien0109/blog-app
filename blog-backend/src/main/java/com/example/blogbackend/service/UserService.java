package com.example.blogbackend.service;

import com.example.blogbackend.constant.ConstantValue;
import com.example.blogbackend.entity.User;
import com.example.blogbackend.exception.BadRequestException;
import com.example.blogbackend.exception.ResourceNotFoundException;
import com.example.blogbackend.model.request.CreateUserRequest;
import com.example.blogbackend.model.request.UpdateUserRequest;
import com.example.blogbackend.repository.UserRepository;
import com.example.blogbackend.utils.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll(Sort.by("createdAt").descending());
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user có id = " + id));
    }

    public User create(CreateUserRequest request) {
        // find user by email -> throw exception if exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email đã tồn tại");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .avatar(StringUtils.generateLinkImage(request.getName()))
                .role(request.getRole())
                .build();
        return userRepository.save(user);
    }

    public User updateUser(Integer id, UpdateUserRequest request) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user có id = " + id));

        existingUser.setName(request.getName());
        existingUser.setRole(request.getRole());
        existingUser.setAvatar(request.getAvatar());
        return userRepository.save(existingUser);
    }

    public void deleteUser(Integer id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user có id = " + id));

        // TODO: delete all images of user in image folder and database

        userRepository.delete(existingUser);
    }

    public String resetPassword(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy user có id = " + id));

        user.setPassword(passwordEncoder.encode(ConstantValue.DEFAULT_PASSWORD));
        userRepository.save(user);
        return ConstantValue.DEFAULT_PASSWORD;
    }
}
