package com.example.blogbackend.controller;

import com.example.blogbackend.entity.User;
import com.example.blogbackend.exception.NotFoundException;
import com.example.blogbackend.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
@Slf4j
public class ImageController {
    private final ImageService imageService;

    // Lấy danh sách ảnh của user
    @GetMapping("admin/images")
    public ResponseEntity<?> getAllImage() {
        return ResponseEntity.ok(imageService.getAllImage());
    }

    // Xem ảnh
    @GetMapping("public/images/{id}")
    public ResponseEntity<?> readImage(@PathVariable Integer id) {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(imageService.readImage(id));
    }

    // Upload ảnh
    @PostMapping("admin/images")
    public ResponseEntity<?> uploadImage(@ModelAttribute("file") MultipartFile file, Principal principal) {
        log.info("Principal name : {}", principal.getName());
        return new ResponseEntity<>(imageService.uploadImage(file), HttpStatus.CREATED);
    }

    // Xóa ảnh
    @DeleteMapping("admin/images/{id}")
    public ResponseEntity<?> deleteImage(@PathVariable Integer id) {
        imageService.deleteImage(id);
        return ResponseEntity.noContent().build(); // 204
    }
}
