package com.example.blogbackend.repository;

import com.example.blogbackend.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByBlog_IdOrderByCreatedAtDesc(Integer blogId);
}