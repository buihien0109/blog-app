package com.example.blogbackend;

import com.example.blogbackend.model.dto.CategoryDto;
import com.example.blogbackend.model.dto.ViewMonthDto;
import com.example.blogbackend.repository.CategoryRepository;
import com.example.blogbackend.repository.ViewHistoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class BlogBackendApplicationTests {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ViewHistoryRepository viewHistoryRepository;

    @Test
    void findCategoriesUsed_test() {
        List<CategoryDto> categoryDtoList = categoryRepository.findCategoriesUsed();
        categoryDtoList.forEach(System.out::println);
    }

    @Test
    void countViewsByMonth_test() {
        List<ViewMonthDto> viewMonthDtoList = viewHistoryRepository.countViewsByMonth();
        viewMonthDtoList.forEach(System.out::println);
    }
}
