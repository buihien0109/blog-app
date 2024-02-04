package com.example.blogbackend.repository;

import com.example.blogbackend.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
    List<Blog> findByStatusOrderByPublishedAtDesc(Boolean status);

    List<Blog> findByTitleContainsIgnoreCaseAndStatusOrderByPublishedAtDesc(String title, Boolean status);

    Optional<Blog> findByIdAndSlugAndStatus(Integer id, String slug, Boolean status);

    List<Blog> findByUser_IdOrderByCreatedAtDesc(Integer id);

    List<Blog> findByOrderByCreatedAtDesc();

    List<Blog> findByCategories_SlugAndStatusOrderByPublishedAtDesc(String categorySlug, boolean status);
}