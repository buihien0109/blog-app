package com.example.blogbackend.model.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpsertCommentRequest {
    @NotEmpty(message = "Nội dung không được để trống")
    String content;

    @NotNull(message = "BlogId không được để trống")
    Integer blogId;
}
