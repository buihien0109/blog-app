package com.example.blogbackend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDto {
    private Integer id;
    private String name;
    private String email;
    private String avatar;
    private String role;
}
