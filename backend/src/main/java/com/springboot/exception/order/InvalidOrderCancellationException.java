package com.springboot.exception.order;

public class InvalidOrderCancellationException extends OrderException{
    public InvalidOrderCancellationException(String message) {
        super(message);
    }
}
