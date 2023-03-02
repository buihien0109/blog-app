package com.example.blogbackend.mapper;

import com.example.blogbackend.dto.BlogDto;
import com.example.blogbackend.entity.Blog;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BlogMapper {

    @Autowired
    private UserMapper userMapper;

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
