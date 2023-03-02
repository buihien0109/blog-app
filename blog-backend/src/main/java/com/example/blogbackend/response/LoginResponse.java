package com.example.blogbackend.response;

import com.example.blogbackend.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private User auth;
    private String token;

    @JsonProperty("isAuthenticated")
    private Boolean isAuthenticated;
}
