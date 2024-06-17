package com.springboot.exception.order;
public class OrderAlreadyPaidException extends OrderException {
    public OrderAlreadyPaidException(String message) {
        super(message);
    }
}
