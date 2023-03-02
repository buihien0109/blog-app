package com.example.blogbackend.dto;

import com.example.blogbackend.entity.Category;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class BlogDto {
    private Integer id;
    private String title;
    private String slug;
    private String description;
    private String content;
    private String thumbnail;
    private LocalDateTime createdAt;
    private LocalDateTime publishedAt;
    private LocalDateTime updatedAt;
    private Boolean status;
    private UserDto user;
    private Set<Category> categories;
}
