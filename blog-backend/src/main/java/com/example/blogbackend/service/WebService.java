package com.example.blogbackend.service;

import com.example.blogbackend.dto.CategoryDto;
import com.example.blogbackend.entity.Blog;
import com.example.blogbackend.exception.NotFoundException;
import com.example.blogbackend.repository.BlogRepository;
import com.example.blogbackend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WebService {
    private final BlogRepository blogRepository;
    private final CategoryRepository categoryRepository;

    // 1. Lấy danh sách tất cả bài viết đã public theo thời gian public giảm dần
    public List<Blog> getAllBlogPublic() {
        return blogRepository.findByStatusOrderByPublishedAtDesc(true);
    }

    // 2. Tìm kiếm bài viết theo từ khóa
    public List<Blog> searchBlog(String term) {
        return blogRepository.findByTitleContainsIgnoreCaseAndStatusOrderByPublishedAtDesc(term, true);
    }

    // 3. Lấy danh sách category
    public List<CategoryDto> getAllCategory() {
        return categoryRepository.findCategoriesUsedOther();
    }

    // 4. Lấy danh sách bài viết thuộc category
    public List<Blog> getBlogsOfCategory(String categoryName) {
        return blogRepository.findByCategories_NameAndStatusOrderByPublishedAtDesc(categoryName, true);
    }

    // 5. Lấy chi tiết bài viết
    public Blog getBlogDetail(Integer blogId, String blogSlug) {
        return blogRepository.findByIdAndSlugAndStatus(blogId, blogSlug, true).orElseThrow(() -> {
           throw new NotFoundException(String.format("Not found blog with id = %d and slug = %s", blogId, blogSlug));
        });
    }

    // 6. Lấy ra top 5 category được áp dụng nhiều nhất
    public List<CategoryDto> getTop5Category() {
        List<CategoryDto> categoryDtos = categoryRepository.findCategoriesUsedOther();
        return categoryDtos.stream()
                .sorted((c1, c2) -> Math.toIntExact(c2.getUsed() - c1.getUsed()))
                .limit(5)
                .toList();
    }
}
