package com.example.blogbackend.model.dto;

import com.example.blogbackend.entity.Category;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BlogDto {
    Integer id;
    String title;
    String slug;
    String description;
    String content;
    String thumbnail;
    LocalDateTime createdAt;
    LocalDateTime publishedAt;
    LocalDateTime updatedAt;
    Boolean status;
    UserDto user;
    Set<Category> categories;
}