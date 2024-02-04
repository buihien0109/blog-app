package com.example.blogbackend.controller;

import com.example.blogbackend.service.WebService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class WebController {
    private final WebService webService;

    @GetMapping("blogs")
    public ResponseEntity<?> getAllBlogPublic() {
        return ResponseEntity.ok(webService.getAllBlogPublic());
    }

    @GetMapping("blogs/search")
    public ResponseEntity<?> searchBlog(@RequestParam String term) {
        return ResponseEntity.ok(webService.searchBlog(term));
    }

    @GetMapping("categories")
    public ResponseEntity<?> getAllCategory() {
        return ResponseEntity.ok(webService.getAllCategory());
    }

    @GetMapping("categories/top")
    public ResponseEntity<?> getTopCategory(@RequestParam(required = false, defaultValue = "5") Integer limit) {
        return ResponseEntity.ok(webService.getTopCategory(limit));
    }

    @GetMapping("categories/{slug}")
    public ResponseEntity<?> getBlogsOfCategory(@PathVariable String slug) {
        return ResponseEntity.ok(webService.getBlogsOfCategory(slug));
    }

    @GetMapping("blogs/{id}/{slug}")
    public ResponseEntity<?> getBlogDetail(@PathVariable Integer id, @PathVariable String slug) {
        return ResponseEntity.ok(webService.getBlogDetail(id, slug));
    }
}
