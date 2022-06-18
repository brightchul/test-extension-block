package com.test.extensionblock.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class ResponseDto<T> {
    private String message;
    private boolean success;
    private T data;
}
