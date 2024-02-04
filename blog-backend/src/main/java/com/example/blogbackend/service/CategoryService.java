package com.example.blogbackend.service;

import com.example.blogbackend.entity.Category;
import com.example.blogbackend.exception.BadRequestException;
import com.example.blogbackend.model.dto.CategoryDto;
import com.example.blogbackend.model.mapper.CategoryMapper;
import com.example.blogbackend.model.request.UpsertCategoryRequest;
import com.example.blogbackend.repository.CategoryRepository;
import com.github.slugify.Slugify;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final Slugify slugify;
    private final CategoryMapper categoryMapper;

    public List<CategoryDto> getCategories() {
        List<Category> categories = categoryRepository.findAll(Sort.by("createdAt").descending());
        return categories.stream()
                .map(categoryMapper::toCategoryDto)
                .toList();
    }

    public CategoryDto createCategory(UpsertCategoryRequest request) {
        // Kiểm tra xem danh mục đã tồn tại chưa
        if (categoryRepository.existsByName(request.getName())) {
            throw new BadRequestException("Danh mục đã tồn tại");
        }

        Category category = Category.builder()
                .name(request.getName())
                .slug(slugify.slugify(request.getName()))
                .build();

        categoryRepository.save(category);
        return categoryMapper.toCategoryDto(category);
    }

    public CategoryDto updateCategory(Integer id, UpsertCategoryRequest request) {
        // Tìm danh mục theo id. Nếu không tồn tại thì ném ra ResourceNotFoundException
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Danh mục không tồn tại"));

        // Kiểm tra xem có trùng tên với danh mục khác không (không tính chính nó)
        if (categoryRepository.existsByNameAndIdNot(request.getName(), id)) {
            throw new BadRequestException("Danh mục đã tồn tại");
        }

        category.setName(request.getName());
        category.setSlug(slugify.slugify(request.getName()));

        categoryRepository.save(category);
        return categoryMapper.toCategoryDto(category);
    }

    public void deleteCategory(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Danh mục không tồn tại"));

        // Kiểm tra xem danh mục có blog nào sử dụng không
        if (!category.getBlogs().isEmpty()) {
            throw new BadRequestException("Danh mục đang được sử dụng");
        }

        categoryRepository.delete(category);
    }
}
