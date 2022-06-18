package com.test.extensionblock.error;

public class ExtensionCountMaxException extends RuntimeException {
    public ExtensionCountMaxException(long maxLength) {
        super("extension count max limit is " + maxLength);
    }
}
