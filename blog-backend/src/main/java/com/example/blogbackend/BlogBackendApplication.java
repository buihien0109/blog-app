package com.example.blogbackend;

import com.github.javafaker.Faker;
import com.github.slugify.Slugify;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BlogBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlogBackendApplication.class, args);
    }

    @Bean
    public Faker faker() {
        return new Faker();
    }

    @Bean
    public Slugify slugify() {
        return Slugify.builder().build();
    }

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
