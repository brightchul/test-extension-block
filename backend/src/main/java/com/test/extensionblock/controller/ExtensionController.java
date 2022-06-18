package com.test.extensionblock.controller;


import com.test.extensionblock.dto.ResponseDto;
import com.test.extensionblock.entity.Extension;
import com.test.extensionblock.repository.ExtensionRepository;
import com.test.extensionblock.service.ExtensionService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@AllArgsConstructor
@RestController
@Validated
public class ExtensionController {
    private final ExtensionRepository extensionRepository;
    private final ExtensionService extensionService;

    // TODO (@brightchul) : 확인용, 작성 끝나고 삭제 예정
    @GetMapping("/extension/all")
    public List<Extension> getAllExtension() {
        return extensionRepository.findAll();
    }



    @PostMapping("/extension/fixed/{name}")
    public ResponseEntity<ResponseDto> addBlockFixedExtension(@PathVariable String name) {
        Extension result = extensionService.addBlockFixedExtension(name);
        ResponseDto responseDto = ResponseDto.<Extension>builder()
                .success(true)
                .message("Extension " + name + " is added.")
                .data(result).build();

        return ResponseEntity.ok().body(responseDto);
    }

    @PostMapping("/extension/custom/{name}")
    public ResponseEntity<ResponseDto> addBlockCustomExtension(@PathVariable String name) {
        Extension result = extensionService.addBlockCustomExtension(name);
        ResponseDto responseDto = ResponseDto.<Extension>builder()
                .success(true)
                .message("Extension " + name + " is added.")
                .data(result).build();

        return ResponseEntity.ok().body(responseDto);
    }
}
