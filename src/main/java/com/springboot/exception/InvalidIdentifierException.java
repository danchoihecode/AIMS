package com.springboot.exception;

public class InvalidIdentifierException extends RefundException{
    public InvalidIdentifierException() {
        super("ERROR: INVALID IDENTIFIER");
    }
}
