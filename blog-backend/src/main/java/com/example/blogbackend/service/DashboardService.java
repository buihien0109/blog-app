package com.example.blogbackend.service;

import com.example.blogbackend.entity.Blog;
import com.example.blogbackend.entity.Comment;
import com.example.blogbackend.entity.User;
import com.example.blogbackend.model.dto.BlogViewDto;
import com.example.blogbackend.model.dto.ViewMonthDto;
import com.example.blogbackend.repository.BlogRepository;
import com.example.blogbackend.repository.CommentRepository;
import com.example.blogbackend.repository.UserRepository;
import com.example.blogbackend.repository.ViewHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardService {
    private final BlogRepository blogRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final ViewHistoryRepository viewHistoryRepository;

    public Map<String, Object> getDashboardData() {
        Map<String, Object> map = new HashMap<>();
        map.put("countLatestBlogs", countLatestBlogs());
        map.put("countLatestUsers", countLatestUsers());
        map.put("countLatestComments", countLatestComments());
        map.put("totalViewsByMonth", countTotalViewsByMonth(5));
        map.put("topViewBlogs", getTopViewBlogs(5));
        map.put("latestBlogs", getLatestBlogs(10));
        map.put("latestUsers", getLatestUsers(10));
        map.put("latestComments", getLatestComments(10));
        return map;
    }

    // Đếm số lượng các blog được tạo ra trong tháng hiện tại và tổng số blog có trong hệ thống (Map<String, Long>)
    public Map<String, Long> countLatestBlogs() {
        LocalDateTime start = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime end = LocalDate.now()
                .withDayOfMonth(LocalDate.now().lengthOfMonth()).atStartOfDay();
        long count = blogRepository.countByCreatedAtBetween(start, end);
        long total = blogRepository.findAll().size();

        Map<String, Long> map = new HashMap<>();
        map.put("count", count);
        map.put("total", total);
        return map;
    }

    // Đếm số lượng các user được tạo ra trong tháng hiện tại và tổng số user có trong hệ thống (Map<String, Long>)
    public Map<String, Long> countLatestUsers() {
        LocalDateTime start = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime end = LocalDate.now()
                .withDayOfMonth(LocalDate.now().lengthOfMonth()).atStartOfDay();
        long count = userRepository.countByCreatedAtBetween(start, end);
        long total = userRepository.findAll().size();

        Map<String, Long> map = new HashMap<>();
        map.put("count", count);
        map.put("total", total);
        return map;
    }

    // Đếm số lượng các comment được tạo ra trong tháng hiện tại
    public long countLatestComments() {
        LocalDateTime start = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime end = LocalDate.now()
                .withDayOfMonth(LocalDate.now().lengthOfMonth()).atStartOfDay();
        return commentRepository.countByCreatedAtBetween(start, end);
    }

    // Tính tổng view của 5 tháng gần nhất (Map<String, Long>, String là tháng, Long là tổng view của tháng đó)
    public List<ViewMonthDto> countTotalViewsByMonth(Integer limit) {
        List<ViewMonthDto> viewMonthDtos = viewHistoryRepository.countViewsByMonth();
        if (limit != null && limit > 0) {
            return viewMonthDtos.subList(0, Math.min(limit, viewMonthDtos.size()));
        }
        return viewMonthDtos;
    }

    // Lấy danh sách blog có lượt xem cao nhất trong tháng (sắp xếp theo lượt xem giảm dần)
    public List<BlogViewDto> getTopViewBlogs(Integer limit) {
        LocalDateTime start = LocalDate.now().withDayOfMonth(1).atStartOfDay();
        LocalDateTime end = LocalDate.now()
                .withDayOfMonth(LocalDate.now().lengthOfMonth()).atStartOfDay();

        List<BlogViewDto> blogViewDtos = blogRepository.findTopViewBlogs(start, end);
        if (limit != null && limit > 0) {
            return blogViewDtos.subList(0, Math.min(limit, blogViewDtos.size()));
        }
        return blogViewDtos;
    }

    // Lấy danh sách 10 bài blog được tạo gần đây nhất (sắp xếp theo thời gian tạo giảm dần)
    public List<Blog> getLatestBlogs(Integer limit) {
        Page<Blog> pageData = blogRepository
                .findByOrderByCreatedAtDesc(PageRequest.of(0, limit));
        return pageData.getContent();
    }

    // Lấy danh sách 10 user được tạo gần đây nhất (sắp xếp theo thời gian tạo giảm dần)
    public List<User> getLatestUsers(Integer limit) {
        Page<User> pageData = userRepository
                .findByOrderByCreatedAtDesc(PageRequest.of(0, limit));
        return pageData.getContent();
    }

    // Lấy danh sách 10 comment được tạo gần đây nhất (sắp xếp theo thời gian tạo giảm dần)
    public List<Comment> getLatestComments(Integer limit) {
        Page<Comment> pageData = commentRepository
                .findByOrderByCreatedAtDesc(PageRequest.of(0, limit));
        return pageData.getContent();
    }
}
