package com.example.blogbackend;

import com.example.blogbackend.entity.Blog;
import com.example.blogbackend.entity.User;
import com.example.blogbackend.mapper.BlogMapper;
import com.example.blogbackend.mapper.UserMapper;
import com.example.blogbackend.repository.BlogRepository;
import com.example.blogbackend.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

//@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@SpringBootTest
public class DtoTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private BlogMapper blogMapper;

    @Test
    void test_user_dto() {
        User user = userRepository.findById(1).orElseThrow(() -> {
            throw new RuntimeException("Error");
        });

        System.out.println(userMapper.toUserDto(user));
    }

    @Test
    void test_blog_dto() {
        Blog blog = blogRepository.findById(2).orElseThrow(() -> {
            throw new RuntimeException("Error");
        });

        blog.getCategories().forEach(System.out::println);
        System.out.println(blogMapper.toBlogDto(blog));
    }
}
