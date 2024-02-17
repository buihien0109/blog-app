package com.example.blogbackend;

import com.example.blogbackend.entity.Blog;
import com.example.blogbackend.entity.ViewHistory;
import com.example.blogbackend.repository.BlogRepository;
import com.example.blogbackend.repository.ViewHistoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

@SpringBootTest
public class DataTests {
    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private ViewHistoryRepository viewHistoryRepository;

    @Transactional
    @Rollback(false)
    @Test
    void rd_view_count_of_blog() {
        Random rd = new Random();
        List<Blog> blogs = blogRepository.findByStatus(true);

        LocalDateTime start = LocalDateTime.of(2023, 12, 1, 0, 0);
        LocalDateTime end = LocalDateTime.now();
        for (Blog blog : blogs) {
            // Random view count from 10 -> 20
            int viewCount = rd.nextInt(11) + 10;
            for (int i = 0; i < viewCount; i++) {
                ViewHistory viewHistory = ViewHistory.builder()
                        .blog(blog)
                        .viewedAt(randomDate(start, end))
                        .build();
                blog.addViewHistory(viewHistory);
            }
            blog.setViewCount(viewCount);
            blogRepository.save(blog);
        }
    }

    // write method to random date between start and end
    private LocalDateTime randomDate(LocalDateTime start, LocalDateTime end) {
        long days = ChronoUnit.DAYS.between(start, end);
        long randomDay = ThreadLocalRandom.current().nextLong(days + 1);

        long randomHour = ThreadLocalRandom.current().nextLong(24);
        long randomMinute = ThreadLocalRandom.current().nextLong(60);
        long randomSecond = ThreadLocalRandom.current().nextLong(60);

        return start
                .plusDays(randomDay)
                .plusHours(randomHour)
                .plusMinutes(randomMinute)
                .plusSeconds(randomSecond);
    }

    @Test
    void test_rd_date() {
        LocalDateTime start = LocalDateTime.of(2023, 12, 1, 0, 0);
        LocalDateTime end = LocalDateTime.now();
        for (int i = 0; i < 10; i++) {
            System.out.println(randomDate(start, end));
        }
    }
}
