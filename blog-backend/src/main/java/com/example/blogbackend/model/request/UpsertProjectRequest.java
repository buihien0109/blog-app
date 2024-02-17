package com.example.blogbackend.model.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpsertProjectRequest {
    @NotEmpty(message = "Tiêu đề không được để trống")
    String title;

    @NotEmpty(message = "Mô tả không được để trống")
    String description;

    String thumbnail;
    String link; // link deployed project

    @NotEmpty(message = "Link source code không được để trống")
    String source; // link source code git
}
