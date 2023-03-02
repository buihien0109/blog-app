package com.example.blogbackend.controller;

import com.example.blogbackend.service.WebService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/public")
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

    @GetMapping("categories/top5")
    public ResponseEntity<?> getTop5Category() {
        return ResponseEntity.ok(webService.getTop5Category());
    }

    @GetMapping("categories/{categoryName}")
    public ResponseEntity<?> getBlogsOfCategory(@PathVariable String categoryName) {
        return ResponseEntity.ok(webService.getBlogsOfCategory(categoryName));
    }

    @GetMapping("blogs/{blogId}/{blogSlug}")
    public ResponseEntity<?> getBlogDetail(@PathVariable Integer blogId, @PathVariable String blogSlug) {
        return ResponseEntity.ok(webService.getBlogDetail(blogId, blogSlug));
    }
}
