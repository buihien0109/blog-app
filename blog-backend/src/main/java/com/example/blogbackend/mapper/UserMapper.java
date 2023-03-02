package com.example.blogbackend.mapper;

import com.example.blogbackend.dto.UserDto;
import com.example.blogbackend.entity.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    @Autowired
    private ModelMapper modelMapper;

    public UserDto toUserDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }
}
