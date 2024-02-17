package com.example.blogbackend.model.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ViewMonthDto {
    int month;
    int year;
    long viewCount;
}
