package com.example.blogbackend.repository;

import com.example.blogbackend.entity.Category;
import com.example.blogbackend.model.dto.CategoryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Set<Category> findByIdIn(List<Integer> ids);

    // Lấy ra danh sách category được sử dụng -> sắp xếp theo số lần sử dụng giảm dần -> return List<CategoryDto> (JPQL)
    @Query("select new com.example.blogbackend.model.dto.CategoryDto(c.id, c.name, c.slug, count(b.id)) from Category c join c.blogs b where b.status = true group by c.id, c.name order by count(b.id) desc")
    List<CategoryDto> findCategoriesUsed();

    @Query("select new com.example.blogbackend.model.dto.CategoryDto(c.id, c.name, c.slug, count(b.id)) from Category c join c.blogs b where b.status = true group by c.id, c.name order by c.createdAt desc")
    List<CategoryDto> getAllCategories();

    boolean existsByName(String name);

    boolean existsByNameAndIdNot(String name, Integer id);
}