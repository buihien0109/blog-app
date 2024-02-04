package com.example.blogbackend.service;

import com.example.blogbackend.entity.Image;
import com.example.blogbackend.entity.User;
import com.example.blogbackend.exception.BadRequestException;
import com.example.blogbackend.exception.ResourceNotFoundException;
import com.example.blogbackend.model.response.ImageResponse;
import com.example.blogbackend.repository.ImageRepository;
import com.example.blogbackend.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageRepository imageRepository;

    public List<ImageResponse> getAllImage() {
        User user = SecurityUtils.getCurrentUserLogin();
        List<Image> images = imageRepository.findByUser_IdOrderByCreatedAtDesc(user.getId());

        return images.stream()
                .map(image -> new ImageResponse(image.getId(), "/api/public/images/" + image.getId()))
                .toList();
    }

    public Image getImageById(Integer id) {
        return imageRepository.findById(id).orElse(null);
    }

    public ImageResponse uploadImage(MultipartFile file) {
        User user = SecurityUtils.getCurrentUserLogin();
        validateFile(file);

        try {
            Image image = Image.builder()
                    .data(file.getBytes())
                    .type(file.getContentType())
                    .size(extractSize(file))
                    .user(user)
                    .build();

            imageRepository.save(image);

            String url = "/api/public/images/" + image.getId();
            return ImageResponse.builder()
                    .id(image.getId())
                    .url(url)
                    .build();
        } catch (Exception e) {
            log.error("Lỗi khi lưu file", e);
            throw new RuntimeException(e.getMessage());
        }
    }

    private void validateFile(MultipartFile file) {
        // Kiểm tra tên file
        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.isEmpty()) {
            throw new BadRequestException("File name không được để trống");
        }

        String fileExtension = getFileExtensiton(fileName);
        if (!checkFileExtension(fileExtension)) {
            throw new BadRequestException("File không đúng định dạng");
        }

        // Kiểm tra dung lượng file (<= 2MB)
        if (extractSize(file) > 2.0) {
            throw new BadRequestException("File không được vượt quá 2MB");
        }
    }

    private String getFileExtensiton(String fileName) {
        int lastIndexOf = fileName.lastIndexOf(".");
        return fileName.substring(lastIndexOf + 1);
    }

    private boolean checkFileExtension(String fileExtension) {
        List<String> extensions = new ArrayList<>(List.of("png", "jpg", "jpeg"));
        return extensions.contains(fileExtension.toLowerCase());
    }

    // Tính toán kích thước của file
    public double extractSize(MultipartFile file) {
        long sizeInBytes = file.getSize();

        // làm tròn 2 dấu phay động
        return Math.round((double) sizeInBytes / (1024 * 1024) * 100) / 100.0;
    }

    public void deleteImage(Integer id) {
        User user = SecurityUtils.getCurrentUserLogin();

        Image image = imageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy image có id = " + id));

        if (!image.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Bạn không có quyền xóa image này");
        }

        imageRepository.delete(image);
    }
}
