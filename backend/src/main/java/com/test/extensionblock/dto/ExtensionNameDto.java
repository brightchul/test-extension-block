package com.test.extensionblock.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
public class ExtensionNameDto {
    @NotBlank                       // must not be blank
    @Length(min = 1, max = 20)      // length must be between 1 and 20
    private String name;
}
