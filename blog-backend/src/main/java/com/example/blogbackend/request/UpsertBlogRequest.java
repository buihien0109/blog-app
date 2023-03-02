package com.example.blogbackend.request;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UpsertBlogRequest {
    private String title;
    private String description;
    private String content;
    private String thumbnail;
    private Boolean status;
    private List<Integer> categoryIds; // Danh sách id của các category áp dụng
}
