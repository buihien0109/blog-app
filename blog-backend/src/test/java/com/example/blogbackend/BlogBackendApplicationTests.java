package com.example.blogbackend;

import com.example.blogbackend.dto.CategoryDto;
import com.example.blogbackend.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class BlogBackendApplicationTests {
    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    void findCategoriesUsed_test() {
        List<CategoryDto> categoryDtoList = categoryRepository.findCategoriesUsed();
        categoryDtoList.forEach(System.out::println);
    }

    @Test
    void findCategoriesUsedOther_test() {
        List<CategoryDto> categoryDtoList = categoryRepository.findCategoriesUsedOther();
        categoryDtoList.forEach(System.out::println);
    }

}
