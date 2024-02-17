package com.example.blogbackend.service;

import com.example.blogbackend.entity.Blog;
import com.example.blogbackend.entity.Category;
import com.example.blogbackend.entity.Project;
import com.example.blogbackend.entity.ViewHistory;
import com.example.blogbackend.exception.ResourceNotFoundException;
import com.example.blogbackend.model.dto.BlogDto;
import com.example.blogbackend.model.dto.CategoryDto;
import com.example.blogbackend.repository.BlogRepository;
import com.example.blogbackend.repository.CategoryRepository;
import com.example.blogbackend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class WebService {
    private final BlogRepository blogRepository;
    private final CategoryRepository categoryRepository;
    private final ProjectRepository projectRepository;

    public List<BlogDto> getBlogsLatest(Integer limit) {
        log.info("Get latest blogs with limit = {}", limit);
        Pageable pageable = PageRequest.of(0, limit, Sort.by("createdAt").descending());
        Page<BlogDto> pageData = blogRepository.findByStatus(true, pageable);
        return pageData.getContent();
    }

    public List<BlogDto> searchBlog(String term) {
        log.info("Search blog with term = {}", term);
        return blogRepository.findByTitleContainsIgnoreCaseAndStatus(term, true);
    }

    public List<CategoryDto> getAllCategories() {
        log.info("Get all categories");
        return categoryRepository.findCategoriesUsed();
    }

    public Page<BlogDto> getBlogsByCategory(String categorySlug, Integer page, Integer limit) {
        log.info("Get blogs by category with slug = {} and page = {} and limit = {}", categorySlug, page, limit);
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        return blogRepository.findByCategories_SlugAndStatus(categorySlug, true, pageable);
    }

    @Transactional
    public Blog getBlogDetail(Integer blogId, String blogSlug) {
        log.info("Get blog detail with id = {} and slug = {}", blogId, blogSlug);
        Blog blog = blogRepository.findByIdAndSlugAndStatus(blogId, blogSlug, true)
                .orElseThrow(() -> new ResourceNotFoundException(
                        String.format("Không tìm thấy blog có id = %d và slug = %s", blogId, blogSlug)));

        // Save view history
        blog.setViewCount(blog.getViewCount() + 1);
        ViewHistory viewHistory = ViewHistory.builder()
                .blog(blog)
                .build();
        blog.addViewHistory(viewHistory);
        return blogRepository.save(blog);
    }

    public List<CategoryDto> getTopCategory(Integer limit) {
        log.info("Get top category with limit = {}", limit);
        List<CategoryDto> categoryDtos = categoryRepository.findCategoriesUsed();
        if (categoryDtos.size() > limit) {
            return categoryDtos.subList(0, limit);
        }
        return categoryDtos;
    }

    public List<Project> getAllProjects() {
        log.info("Get all projects");
        return projectRepository.findAll(Sort.by("createdAt").descending());
    }

    public List<BlogDto> getMostViewBlogs(Integer limit) {
        log.info("Get most view blogs with limit = {}", limit);
        // get most view blog in 2 months latest
        LocalDateTime start = LocalDateTime.now().minusMonths(2);
        LocalDateTime end = LocalDateTime.now();
        List<BlogDto> blogs = blogRepository.findMostViewBlog(start, end);
        if (blogs.size() > limit) {
            return blogs.subList(0, limit);
        }
        return blogs;
    }

    public Category getCategoryDetail(String slug) {
        log.info("Get category detail with slug = {}", slug);
        return categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy category có slug = " + slug));
    }

    public Page<BlogDto> getAllBlogs(Integer page, Integer limit) {
        log.info("Get all blogs with page = {} and limit = {}", page, limit);
        Pageable pageable = PageRequest.of(page - 1, limit, Sort.by("createdAt").descending());
        return blogRepository.findByStatus(true, pageable);
    }

    public List<BlogDto> getRecommendBlogs(Integer blogId, Integer limit) {
        log.info("Get recommend blogs for blog id = {}", blogId);
        List<BlogDto> blogs = blogRepository.findRecommendBlogs(blogId);
        if (blogs.size() > limit) {
            return blogs.subList(0, limit);
        }
        return blogs;
    }
}
