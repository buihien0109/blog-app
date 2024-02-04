package com.example.blogbackend.model.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpsertCategoryRequest {
    @NotEmpty(message = "Tên danh mục không được để trống")
    String name;
}
