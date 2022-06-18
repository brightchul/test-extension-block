package com.test.extensionblock.service;

import com.test.extensionblock.dto.ExtensionNameDto;
import com.test.extensionblock.entity.Extension;
import com.test.extensionblock.error.ExtensionCountMaxException;
import com.test.extensionblock.error.ExtensionNameDuplicateException;
import com.test.extensionblock.error.ExtensionNameValidationException;
import com.test.extensionblock.repository.ExtensionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class ExtensionService {

    final Long maxlengthLimit = 20L;

    @Autowired
    private Validator validator;

    @Autowired
    private ExtensionRepository extensionRepository;

    public Extension addBlockExtension(String extensionName) {
        validateExtensionName(extensionName);

        Extension newBlockExtension = Extension.createExtension(extensionName);
        return extensionRepository.save(newBlockExtension);
    }

    public void validateExtensionName(String extensionName) {
        ExtensionNameDto extensionNameDto = new ExtensionNameDto(extensionName);
        Set<ConstraintViolation<ExtensionNameDto>> validationResult = validator.validate(extensionNameDto);

        if (!validationResult.isEmpty()) {
            List<String> errorMessageList = validationResult.stream()
                    .map(one -> one.getMessage())
                    .collect(Collectors.toList());
            String errorMessage = String.join(", ", errorMessageList);

            throw new ExtensionNameValidationException(errorMessage);
        }

        if (extensionRepository.findByExtensionName(extensionName) != null) {
            throw new ExtensionNameDuplicateException("extension is duplicated");
        }

        if(extensionRepository.count() >= 20) {
            throw new ExtensionCountMaxException(maxlengthLimit);
        }
    }
}
