package com.example.blogbackend.repository;

import com.example.blogbackend.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByBlog_IdOrderByCreatedAtDesc(Integer blogId);

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    Page<Comment> findByOrderByCreatedAtDesc(Pageable pageable);
}