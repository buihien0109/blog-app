package com.example.blogbackend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenUtil {
    // Token có hạn trong vòng 30 ngày kể từ thời điểm tạo, thời gian tính theo giây
    private final Integer duration = 24 * 60 * 60 * 7;

    // Key này sẽ được sử dụng để mã hóa và giải mã
    // Độ dài key > 32 bytes
    private final String secret = "xin-chao-cac-ban-toi-ten-la-jwt-hihihihihi";
    SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

    // Sinh token
    public String generateToken(UserDetails userDetails) {
        // Lưu thông tin Authorities của user vào claims
        Map<String, Object> claims = new HashMap<>();
        claims.put("authorities", userDetails.getAuthorities());

        // 1. Định nghĩa các claims: issuer, expiration, subject, id
        // 2. Mã hóa token sử dụng thuật toán và key bí mật
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + duration * 1000))
                .signWith(key).compact();
    }

    // Lấy thông tin được lưu trong token
    public Claims getClaimsFromToken(String token) {
        // Kiểm tra token có bắt đầu bằng tiền tố
        if (token == null) return null;
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
