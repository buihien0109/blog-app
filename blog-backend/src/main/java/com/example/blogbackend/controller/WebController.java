package com.example.blogbackend.controller;

import com.example.blogbackend.service.WebService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class WebController {
    private final WebService webService;

    @GetMapping("/blogs")
    public ResponseEntity<?> getAllBlogs(@RequestParam(required = false, defaultValue = "1") Integer page,
                                         @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(webService.getAllBlogs(page, limit));
    }

    @GetMapping("/blogs/latest")
    public ResponseEntity<?> getBlogsLatest(
            @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(webService.getBlogsLatest(limit));
    }

    @GetMapping("/blogs/most-view")
    public ResponseEntity<?> getMostViewBlogs(
            @RequestParam(required = false, defaultValue = "5") Integer limit) {
        return ResponseEntity.ok(webService.getMostViewBlogs(limit));
    }

    @GetMapping("/blogs/{id}/recommend")
    public ResponseEntity<?> getRecommendBlogs(
            @RequestParam(required = false, defaultValue = "5") Integer limit,
            @PathVariable Integer id) {
        return ResponseEntity.ok(webService.getRecommendBlogs(id, limit));
    }

    @GetMapping("/blogs/search")
    public ResponseEntity<?> searchBlog(@RequestParam String term) {
        return ResponseEntity.ok(webService.searchBlog(term));
    }

    @GetMapping("/categories")
    public ResponseEntity<?> getAllCategory() {
        return ResponseEntity.ok(webService.getAllCategories());
    }

    @GetMapping("/categories/{slug}")
    public ResponseEntity<?> getCategoryDetail(@PathVariable String slug) {
        return ResponseEntity.ok(webService.getCategoryDetail(slug));
    }

    @GetMapping("/categories/top")
    public ResponseEntity<?> getTopCategory(@RequestParam(required = false, defaultValue = "5") Integer limit) {
        return ResponseEntity.ok(webService.getTopCategory(limit));
    }

    @GetMapping("/categories/{slug}/blogs")
    public ResponseEntity<?> getBlogsOfCategory(@PathVariable String slug,
                                                @RequestParam(required = false, defaultValue = "1") Integer page,
                                                @RequestParam(required = false, defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(webService.getBlogsByCategory(slug, page, limit));
    }

    @GetMapping("/blogs/{id}/{slug}")
    public ResponseEntity<?> getBlogDetail(@PathVariable Integer id, @PathVariable String slug) {
        return ResponseEntity.ok(webService.getBlogDetail(id, slug));
    }

    @GetMapping("/projects")
    public ResponseEntity<?> getAllProjects() {
        return ResponseEntity.ok(webService.getAllProjects());
    }
}
