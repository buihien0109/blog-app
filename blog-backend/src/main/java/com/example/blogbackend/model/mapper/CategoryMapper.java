package com.example.blogbackend.model.mapper;

import com.example.blogbackend.entity.Category;
import com.example.blogbackend.model.dto.CategoryDto;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public CategoryDto toCategoryDto(Category category) {
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .used(category.getBlogs() == null ? 0L : category.getBlogs().size())
                .build();
    }
}
