package com.example.blogbackend.model.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpsertBlogRequest {
    @NotEmpty(message = "Tiêu đề không được để trống")
    String title;

    @NotEmpty(message = "Mô tả không được để trống")
    String description;

    @NotEmpty(message = "Nội dung không được để trống")
    String content;

    String thumbnail;

    @NotNull(message = "Trạng thái không được để trống")
    Boolean status;
    List<Integer> categoryIds; // Danh sách id của các category áp dụng
}
