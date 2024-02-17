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
                .thumbnail(blog.getThumbnail())
                .publishedAt(blog.getPublishedAt())
                .build();
    }
}
