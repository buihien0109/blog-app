package com.example.blogbackend.service;

import com.example.blogbackend.entity.Blog;
import com.example.blogbackend.exception.ResourceNotFoundException;
import com.example.blogbackend.model.dto.CategoryDto;
import com.example.blogbackend.repository.BlogRepository;
import com.example.blogbackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class WebService {
    private final BlogRepository blogRepository;
    private final CategoryRepository categoryRepository;

    public List<Blog> getAllBlogPublic() {
        return blogRepository.findByStatusOrderByPublishedAtDesc(true);
    }

    public List<Blog> searchBlog(String term) {
        return blogRepository.findByTitleContainsIgnoreCaseAndStatusOrderByPublishedAtDesc(term, true);
    }

    public List<CategoryDto> getAllCategory() {
        return categoryRepository.findCategoriesUsed();
    }

    public List<Blog> getBlogsOfCategory(String categorySlug) {
        return blogRepository.findByCategories_SlugAndStatusOrderByPublishedAtDesc(categorySlug, true);
    }

    public Blog getBlogDetail(Integer blogId, String blogSlug) {
        return blogRepository.findByIdAndSlugAndStatus(blogId, blogSlug, true)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Không tìm thấy blog có id = %d và slug = %s", blogId, blogSlug)));
    }

    public List<CategoryDto> getTopCategory(Integer limit) {
        List<CategoryDto> categoryDtos = categoryRepository.findCategoriesUsed();
        if (categoryDtos.size() > limit) {
            return categoryDtos.subList(0, limit);
        }
        return categoryDtos;
    }
}
