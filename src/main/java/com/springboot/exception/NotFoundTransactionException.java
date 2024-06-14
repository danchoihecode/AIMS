package com.springboot.exception;

public class NotFoundTransactionException extends RefundException{
    public NotFoundTransactionException() {
        super("ERROR: NOT FOUND TRANSACTION");
    }
}
