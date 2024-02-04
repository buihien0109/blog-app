package com.example.blogbackend;

import com.example.blogbackend.entity.Blog;
import com.example.blogbackend.entity.Category;
import com.example.blogbackend.entity.Comment;
import com.example.blogbackend.entity.User;
import com.example.blogbackend.model.enums.UserRole;
import com.example.blogbackend.repository.BlogRepository;
import com.example.blogbackend.repository.CategoryRepository;
import com.example.blogbackend.repository.CommentRepository;
import com.example.blogbackend.repository.UserRepository;
import com.github.javafaker.Faker;
import com.github.slugify.Slugify;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

@SpringBootTest
public class InitDataTests {

    @Autowired
    private Faker faker;

    @Autowired
    private Slugify slugify;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void save_users() {
        Random rd = new Random();

        for (int i = 0; i < 5; i++) {
            String name = faker.name().fullName();
            User user = User.builder()
                    .name(name)
                    .email(faker.internet().emailAddress())
                    .avatar(generateLinkImage(name))
                    .password(passwordEncoder.encode("123"))
                    .role(UserRole.values()[rd.nextInt(UserRole.values().length)])
                    .build();

            userRepository.save(user);
        }
    }

    @Test
    void save_categories() {
        // Tạo 20 category
        List<String> categoryNames = List.of("Technology", "Health", "Sport", "Travel", "Food", "Fashion", "Music", "Movie", "Game", "Book", "Education", "Science", "Art", "Design", "Photography", "Business", "Marketing", "Finance", "Economy", "Politics");

        for (String categoryName : categoryNames) {
            Category category = Category.builder()
                    .name(categoryName)
                    .slug(slugify.slugify(categoryName))
                    .build();

            categoryRepository.save(category);
        }
    }

    @Test
    void save_blogs() {
        Random rd = new Random();

        List<User> users = userRepository.findByRole(UserRole.ADMIN);
        List<Category> categories = categoryRepository.findAll();

        for (int i = 0; i < 100; i++) {
            // Random 1 user
            User rdUser = users.get(rd.nextInt(users.size()));

            // Mỗi blog có 1 đến 3 category
            Set<Category> rdCategories = new LinkedHashSet<>();
            for (int j = 0; j < rd.nextInt(3) + 1; j++) {
                rdCategories.add(categories.get(rd.nextInt(categories.size())));
            }

            String title = faker.lorem().sentence(7);
            Blog blog = Blog.builder()
                    .title(title)
                    .slug(slugify.slugify(title))
                    .description(faker.lorem().sentence(20))
                    .content(faker.lorem().sentence(100))
                    .thumbnail(generateLinkImage(title))
                    .status(rd.nextInt(2) == 1)
                    .user(rdUser)
                    .categories(rdCategories)
                    .build();

            blogRepository.save(blog);
        }
    }

    @Test
    void save_comment() {
        Random rd = new Random();

        List<User> users = userRepository.findAll();
        List<Blog> blogs = blogRepository.findAll();

        // Mỗi blog có 5 đến 10 comment
        for (Blog blog : blogs) {
            for (int i = 0; i < rd.nextInt(6) + 5; i++) {
                User rdUser = users.get(rd.nextInt(users.size()));

                Comment comment = Comment.builder()
                        .content(faker.lorem().sentence(20))
                        .user(rdUser)
                        .blog(blog)
                        .build();

                commentRepository.save(comment);
            }
        }
    }

    // generate link author avatar follow struct : https://placehold.co/200x200?text=[...]
    private String generateLinkImage(String str) {
        return "https://placehold.co/200x200?text=" + str.substring(0, 1).toUpperCase();
    }
}
