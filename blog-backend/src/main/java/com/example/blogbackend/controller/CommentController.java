package com.example.blogbackend.controller;

import com.example.blogbackend.model.request.UpsertCommentRequest;
import com.example.blogbackend.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/public/comments")
    public ResponseEntity<?> createComment(@Valid @RequestBody UpsertCommentRequest request) {
        return new ResponseEntity<>(commentService.createComment(request), HttpStatus.CREATED);
    }

    @PutMapping("/public/comments/{id}")
    public ResponseEntity<?> updateComment(@Valid @RequestBody UpsertCommentRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(commentService.updateComment(request, id));
    }

    @DeleteMapping("/public/comments/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Integer id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/admin/comments/{id}")
    public ResponseEntity<?> updateCommentByAdmin(@Valid @RequestBody UpsertCommentRequest request, @PathVariable Integer id) {
        return ResponseEntity.ok(commentService.updateCommentByAdmin(request, id));
    }

    @DeleteMapping("/admin/comments/{id}")
    public ResponseEntity<?> deleteCommentByAdmin(@PathVariable Integer id) {
        commentService.deleteCommentByAdmin(id);
        return ResponseEntity.noContent().build();
    }
}
