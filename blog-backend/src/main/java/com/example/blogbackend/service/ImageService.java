package com.example.blogbackend.service;

import com.example.blogbackend.entity.Image;
import com.example.blogbackend.entity.User;
import com.example.blogbackend.exception.BadRequestException;
import com.example.blogbackend.exception.NotFoundException;
import com.example.blogbackend.repository.ImageRepository;
import com.example.blogbackend.repository.UserRepository;
import com.example.blogbackend.response.ImageResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ImageService {
    private final ImageRepository imageRepository;
    private final UserRepository userRepository;

    public List<String> getAllImage() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            throw new NotFoundException("Not found user with email = " + email);
        });

        List<Image> images = imageRepository.findByUser_IdOrderByCreatedAtDesc(user.getId());

        return images.stream()
                .map(image -> "/api/public/images/" + image.getId())
                .toList();
    }

    public byte[] readImage(Integer id) {
        Image image = imageRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found image with id = " + id);
        });

        return image.getData();
    }

    public ImageResponse uploadImage(MultipartFile file) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("Email auth : {}", email);
        User user = userRepository.findByEmail(email).orElseThrow(() -> {
            throw new NotFoundException("Not found user with email = " + email);
        });

        // Validate file
        validateFile(file);

        try {
            Image image = Image.builder()
                    .data(file.getBytes())
                    .user(user)
                    .build();

            imageRepository.save(image);

            String url = "/api/public/images/" + image.getId();
            return new ImageResponse(url);
        } catch (Exception e) {
            throw new RuntimeException("Upload image error");
        }
    }

    private void validateFile(MultipartFile file) {
        // Kiểm tra tên file
        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.isEmpty()) {
            throw new BadRequestException("file không không được để trống");
        }

        // image.png -> png
        // avatar.jpg -> jpg
        // Kiểm tra đuôi file (jpg, png, jpeg)
        String fileExtension = getFileExtensiton(fileName);
        if (!checkFileExtension(fileExtension)) {
            throw new BadRequestException("file không đúng định dạng");
        }

        // Kiểm tra dung lượng file (<= 2MB)
        double fileSize = (double) (file.getSize() / 1_048_576);
        if (fileSize > 2) {
            throw new BadRequestException("file không được vượt quá 2MB");
        }
    }

    private String getFileExtensiton(String fileName) {
        int lastIndexOf = fileName.lastIndexOf(".");
        return fileName.substring(lastIndexOf + 1);
    }

    private boolean checkFileExtension(String fileExtension) {
        List<String> extensions = new ArrayList<>(List.of("png", "jpg", "jpeg", "pdf"));
        return extensions.contains(fileExtension.toLowerCase());
    }

    public void deleteImage(Integer id) {
        Image image = imageRepository.findById(id).orElseThrow(() -> {
            throw new NotFoundException("Not found image with id = " + id);
        });

        imageRepository.delete(image);
    }
}
