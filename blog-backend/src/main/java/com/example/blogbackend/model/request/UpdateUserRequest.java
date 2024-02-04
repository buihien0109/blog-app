package com.example.blogbackend.model.request;

import com.example.blogbackend.model.enums.UserRole;
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
public class UpdateUserRequest {
    @NotEmpty(message = "Tên không được để trống")
    String name;

    @NotNull(message = "Role không được để trống")
    UserRole role;

    String avatar;
}
