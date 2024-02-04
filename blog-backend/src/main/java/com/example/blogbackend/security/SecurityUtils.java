package com.example.blogbackend.security;

import com.example.blogbackend.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

@Slf4j
public class SecurityUtils {
    // Lấy thông tin user hiện tại
    public static User getCurrentUserLogin() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Optional<User> userOptional = Optional.ofNullable(securityContext.getAuthentication()).map(authentication -> {
            log.debug("Lấy thông tin user từ SecurityContext");
            log.debug("Authentication: {}", authentication.getPrincipal());
            if (authentication.getPrincipal() instanceof UserDetails) {
                CustomUserDetails springSecurityUser = (CustomUserDetails) authentication.getPrincipal();
                return springSecurityUser.getUser();
            }
            return null;
        });
        return userOptional.orElse(null);
    }

    // Kiểm tra xem user đã đăng nhập chưa
    public static boolean isAuthenticated() {
        User user = getCurrentUserLogin();
        return user != null;
    }
}
