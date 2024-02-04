package com.example.blogbackend.service;

import com.example.blogbackend.entity.Blog;
import com.example.blogbackend.entity.Category;
import com.example.blogbackend.entity.User;
import com.example.blogbackend.exception.ResourceNotFoundException;
import com.example.blogbackend.model.request.UpsertBlogRequest;
import com.example.blogbackend.repository.BlogRepository;
import com.example.blogbackend.repository.CategoryRepository;
import com.example.blogbackend.security.SecurityUtils;
import com.example.blogbackend.utils.StringUtils;
import com.github.slugify.Slugify;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class BlogService {
    private final BlogRepository blogRepository;
    private final CategoryRepository categoryRepository;
    private final Slugify slugify;

    public List<Blog> getAllBlog() {
        return blogRepository.findByOrderByCreatedAtDesc();
    }

    @Transactional
    public Blog createBlog(UpsertBlogRequest request) {
        User user = SecurityUtils.getCurrentUserLogin();
        Set<Category> categories = categoryRepository.findByIdIn(request.getCategoryIds());

        Blog blog = Blog.builder()
                .title(request.getTitle())
                .slug(slugify.slugify(request.getTitle()))
                .content(request.getContent())
                .description(request.getDescription())
                .thumbnail(StringUtils.generateLinkImage(request.getTitle()))
                .status(request.getStatus())
                .categories(categories)
                .user(user)
                .build();
        return blogRepository.save(blog);
    }

    public Blog getBlogById(Integer id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy blog có id = " + id));
    }

    @Transactional
    public Blog updateBlog(Integer id, UpsertBlogRequest request) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy blog có id = " + id));
        Set<Category> categories = categoryRepository.findByIdIn(request.getCategoryIds());

        blog.setTitle(request.getTitle());
        blog.setSlug(slugify.slugify(request.getTitle()));
        blog.setDescription(request.getDescription());
        blog.setContent(request.getContent());
        blog.setStatus(request.getStatus());
        blog.setThumbnail(request.getThumbnail());
        blog.setCategories(categories);
        return blogRepository.save(blog);
    }

    @Transactional
    public void deleteBlog(Integer id) {
        // TODO : Khi xóa blog cẩn thận vì liên quan đến comment và category (có thể sử dụng life cycle để xử lý - PreRemove)
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy blog có id = " + id));
        blogRepository.delete(blog);
    }

    public List<Blog> getOwnBlogs() {
        User user = SecurityUtils.getCurrentUserLogin();
        return blogRepository.findByUser_IdOrderByCreatedAtDesc(user.getId());
    }
}
