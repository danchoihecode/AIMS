package com.springboot.exception.order;

public class InvalidDeliveryInfoException extends OrderException {
    public InvalidDeliveryInfoException(String message) {
        super(message);
    }
}
