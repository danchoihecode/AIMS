package com.springboot.exception;

public class RefundException extends RuntimeException{
    public RefundException(String message) {
        super(message);
    }
}
