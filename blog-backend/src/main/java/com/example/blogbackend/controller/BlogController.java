package com.example.blogbackend.controller;

import com.example.blogbackend.request.UpsertBlogRequest;
import com.example.blogbackend.service.BlogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/blogs")
@Slf4j
@RequiredArgsConstructor
public class BlogController {
    private final BlogService blogService;

    @GetMapping("/all-blog")
    public ResponseEntity<?> getAllBlogOther(@RequestParam(required = false, defaultValue = "1") Integer page,
                                             @RequestParam(required = false, defaultValue = "10") Integer pageSize) {
        return ResponseEntity.ok(blogService.getAllBlogOther(page, pageSize));
    }

    //    Xem danh sách blog
    @GetMapping("")
    public ResponseEntity<?> getAllBlog() {
        return ResponseEntity.ok(blogService.getAllBlog());
    }

    //    Xem danh sách blog của user đang login
    @GetMapping("own-blogs")
    public ResponseEntity<?> getOwnBlogs() {
        return ResponseEntity.ok(blogService.getOwnBlogs());
    }

    //    Tạo blog
    @PostMapping("")
    public ResponseEntity<?> createBlog(@RequestBody UpsertBlogRequest request) {
        return new ResponseEntity<>(blogService.createBlog(request), HttpStatus.CREATED); // 201
    }

    //    Xem chi tiết blog
    @GetMapping("{id}")
    public ResponseEntity<?> getBlogById(@PathVariable Integer id) {
        return ResponseEntity.ok(blogService.getBlogById(id)); // 200
    }

    //    Cập nhật thông tin blog
    @PutMapping("{id}")
    public ResponseEntity<?> updateBlog(@PathVariable Integer id, @RequestBody UpsertBlogRequest request) {
        log.info("id : {}", id);
        log.info("request : {}", request);
        return ResponseEntity.ok(blogService.updateBlog(id, request)); // 200
    }

    //    Xóa blog
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable Integer id) {
        blogService.deleteBlog(id);
        return ResponseEntity.noContent().build(); // 204
    }
}
