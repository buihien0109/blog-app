package com.example.blogbackend.model.mapper;

import com.example.blogbackend.entity.Blog;
import com.example.blogbackend.model.dto.BlogDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BlogMapper {
    private final UserMapper userMapper;

    public BlogDto toBlogDto(Blog blog) {
        return BlogDto.builder()
                .id(blog.getId())
                .title(blog.getTitle())
                .slug(blog.getSlug())
                .description(blog.getDescription())
                .content(blog.getContent())
                .thumbnail(blog.getThumbnail())
                .createdAt(blog.getCreatedAt())
                .updatedAt(blog.getUpdatedAt())
                .publishedAt(blog.getPublishedAt())
                .status(blog.getStatus())
                .user(userMapper.toUserDto(blog.getUser()))
                .categories(blog.getCategories())
                .build();
    }
}
