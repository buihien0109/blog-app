package com.example.blogbackend.repository;

import com.example.blogbackend.dto.CategoryDto;
import com.example.blogbackend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Set<Category> findByIdIn(List<Integer> ids);

    @Query("select new com.example.blogbackend.dto.CategoryDto(c.id, c.name, count(1)) " +
            "from Category c " +
            "left join Blog b " +
            "WHERE b.status = true " +
            "group by c.id, c.name")
    List<CategoryDto> findCategoriesUsed();

    @Query(nativeQuery = true, name = "findCategoriesUsedOther")
    List<CategoryDto> findCategoriesUsedOther();
}