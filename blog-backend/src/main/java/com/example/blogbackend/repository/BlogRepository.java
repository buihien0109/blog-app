package com.example.blogbackend.repository;

import com.example.blogbackend.entity.Blog;
import com.example.blogbackend.model.dto.BlogDto;
import com.example.blogbackend.model.dto.BlogViewDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
    @Query("select new com.example.blogbackend.model.dto.BlogDto(b.id, b.title, b.slug, b.description, b.thumbnail, b.publishedAt) from Blog b where b.status = ?1")
    Page<BlogDto> findByStatus(Boolean status, Pageable pageable);

    @Query("select new com.example.blogbackend.model.dto.BlogDto(b.id, b.title, b.slug, b.description, b.thumbnail, b.publishedAt) from Blog b where lower(b.title) like %?1% and b.status = ?2 order by b.createdAt desc")
    List<BlogDto> findByTitleContainsIgnoreCaseAndStatus(String title, Boolean status);

    Optional<Blog> findByIdAndSlugAndStatus(Integer id, String slug, Boolean status);

    List<Blog> findByUser_IdOrderByCreatedAtDesc(Integer id);

    List<Blog> findByOrderByCreatedAtDesc();

    Page<Blog> findByOrderByCreatedAtDesc(Pageable pageable);

    @Query("select new com.example.blogbackend.model.dto.BlogDto(b.id, b.title, b.slug, b.description, b.thumbnail, b.publishedAt) from Blog b join b.categories c where c.slug = ?1 and b.status = ?2")
    Page<BlogDto> findByCategories_SlugAndStatus(String categorySlug, boolean status, Pageable pageable);

    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    List<Blog> findByStatus(boolean b);

    // join to view history to get view count in time range
    @Query("select new com.example.blogbackend.model.dto.BlogViewDto(b.id, b.title, count(vh.id)) from Blog b join ViewHistory vh on b.id = vh.blog.id where vh.viewedAt between ?1 and ?2 group by b.id order by sum(vh.id) desc")
    List<BlogViewDto> findTopViewBlogs(LocalDateTime start, LocalDateTime end);

    // get most view blog in 2 months latest. Join to view history to get view count -> return blog
    @Query("select new com.example.blogbackend.model.dto.BlogDto(b.id, b.title, b.slug, b.description, b.thumbnail, b.publishedAt) from Blog b join ViewHistory vh on b.id = vh.blog.id where b.status = true and vh.viewedAt between ?1 and ?2 group by b.id order by count(vh.id) desc")
    List<BlogDto> findMostViewBlog(LocalDateTime start, LocalDateTime end);

    // get recommend blog by category. get 5 recommend blog is blog in category of blogId and not in blogId and status = true and order by view desc, publishedAt desc
    @Query("select new com.example.blogbackend.model.dto.BlogDto(b.id, b.title, b.slug, b.description, b.thumbnail, b.publishedAt) from Blog b join b.categories c where c.id in (select c.id from Blog b join b.categories c where b.id = ?1) and b.id != ?1 and b.status = true group by b.id order by b.viewCount desc, b.createdAt desc")
    List<BlogDto> findRecommendBlogs(Integer blogId);
}