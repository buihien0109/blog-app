package com.example.blogbackend.exception;

import com.example.blogbackend.model.response.ErrorMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> handleBadRequestException(BadRequestException e) {
        log.error("Bad request: {}", e.getMessage());
        ErrorMessage message = new ErrorMessage(HttpStatus.BAD_REQUEST.value(), e.getMessage());
        return new ResponseEntity<>(
                message,
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {
        log.error("Resource not found: {}", e.getMessage());
        ErrorMessage message = new ErrorMessage(HttpStatus.NOT_FOUND.value(), e.getMessage());
        return new ResponseEntity<>(
                message,
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(ExpiredJwtTokenException.class)
    public ResponseEntity<?> handleExpiredJwtTokenException(ExpiredJwtTokenException e) {
        log.error("Token expired: {}", e.getMessage());
        ErrorMessage message = new ErrorMessage(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
        return new ResponseEntity<>(
                message,
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        log.error("Internal server error: {}", e.getMessage());
        ErrorMessage message = new ErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        return new ResponseEntity<>(
                message,
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class) // Xử lý validation
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException e) {
        log.error("Validation error: {}", e.getMessage());
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return new ResponseEntity<>(
                new ErrorMessage(HttpStatus.BAD_REQUEST.value(), errors),
                HttpStatus.BAD_REQUEST
        );
    }
}
