package com.example.blogbackend.repository;

import com.example.blogbackend.entity.User;
import com.example.blogbackend.model.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    List<User> findByRole(UserRole role);
}