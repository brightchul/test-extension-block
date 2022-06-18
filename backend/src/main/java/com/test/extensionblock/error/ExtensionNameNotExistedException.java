package com.test.extensionblock.error;

public class ExtensionNameNotExistedException extends RuntimeException{
    public ExtensionNameNotExistedException(String message) {
        super(message);
    }
}
