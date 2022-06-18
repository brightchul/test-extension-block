package com.test.extensionblock.service;

import com.test.extensionblock.dto.ExtensionNameDto;
import com.test.extensionblock.entity.Extension;
import com.test.extensionblock.error.ExtensionCountMaxException;
import com.test.extensionblock.error.ExtensionNameDuplicateException;
import com.test.extensionblock.error.ExtensionNameNotExistedException;
import com.test.extensionblock.error.ExtensionNameValidationException;
import com.test.extensionblock.repository.ExtensionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class ExtensionService {

    final Long maxlengthLimit = 20L;
    final List<String> blockFixedExtensionList = List.of("bat", "cmd", "com" ,"cpl", "exe", "scr", "js");

    @Autowired
    private Validator validator;

    @Autowired
    private ExtensionRepository extensionRepository;

    public Extension addBlockFixedExtension(String extensionName) {
        validateFixedExtensionName(extensionName);

        Extension newBlockExtension = Extension.createFixedExtension(extensionName);
        return extensionRepository.save(newBlockExtension);
    }


    @Transactional
    public void deleteBlockFixedExtension(String extensionName) {
        validateFixedExtensionName(extensionName);
        checkFixedExtensionNameDeletePolicy(extensionName);
        extensionRepository.deleteByExtensionName(extensionName);
    }

    private void validateFixedExtensionName(String extensionName) {
        if(!blockFixedExtensionList.contains(extensionName)) {
            throw new ExtensionNameValidationException(extensionName + " is not fixed extension");
        }
    }

    public Extension addBlockCustomExtension(String extensionName) {
        validateCustomExtensionName(extensionName);
        checkCustomExtensionNameCreatePolicy(extensionName);

        Extension newBlockExtension = Extension.createCustomExtension(extensionName);
        return extensionRepository.save(newBlockExtension);
    }

    @Transactional
    public void deleteBlockCustomExtension(String extensionName) {
        validateCustomExtensionName(extensionName);
        checkCustomExtensionNameDeletePolicy(extensionName);
        extensionRepository.deleteByExtensionName(extensionName);
    }




    private void validateCustomExtensionName(String extensionName) {
        ExtensionNameDto extensionNameDto = new ExtensionNameDto(extensionName);
        Set<ConstraintViolation<ExtensionNameDto>> validationResult = validator.validate(extensionNameDto);

        if (!validationResult.isEmpty()) {
            List<String> errorMessageList = validationResult.stream()
                    .map(one -> one.getMessage())
                    .collect(Collectors.toList());
            String errorMessage = String.join(", ", errorMessageList);

            throw new ExtensionNameValidationException(errorMessage);
        }

        if (blockFixedExtensionList.contains(extensionName)) {
            throw new ExtensionNameValidationException(extensionName + " is fixed extension");
        }

    }
    private void checkCustomExtensionNameCreatePolicy(String extensionName) {

        if (extensionRepository.findByExtensionName(extensionName) != null) {
            throw new ExtensionNameDuplicateException("extension is duplicated");
        }

        if(extensionRepository.countByType("custom") >= maxlengthLimit) {
            throw new ExtensionCountMaxException(maxlengthLimit);
        }
    }
    private void checkCustomExtensionNameDeletePolicy(String extensionName) {
        if (extensionRepository.findByExtensionName(extensionName) == null) {
            throw new ExtensionNameNotExistedException("extension is not existed");
        }

        if(extensionRepository.countByType("custom") >= maxlengthLimit) {
            throw new ExtensionCountMaxException(maxlengthLimit);
        }
    }
}
