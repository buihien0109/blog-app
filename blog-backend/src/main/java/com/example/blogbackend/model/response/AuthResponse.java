package com.example.blogbackend.model.response;

import com.example.blogbackend.model.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthResponse {
    UserDto user;
    String accessToken;
    String refreshToken;

    @JsonProperty("isAuthenticated")
    Boolean isAuthenticated;
}
