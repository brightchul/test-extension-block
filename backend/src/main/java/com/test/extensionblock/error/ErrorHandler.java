package com.test.extensionblock.error;

import com.test.extensionblock.dto.ResponseErrorDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorHandler {
    @ExceptionHandler(ExtensionNameValidationException.class)
    public ResponseEntity handleExtensionNameValidationError(ExtensionNameValidationException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ResponseErrorDto(exception.getMessage()));
    }
    @ExceptionHandler(ExtensionNameDuplicateException.class)
    public ResponseEntity handleExtensionNameDuplicateException(ExtensionNameDuplicateException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ResponseErrorDto(exception.getMessage()));
    }
}
