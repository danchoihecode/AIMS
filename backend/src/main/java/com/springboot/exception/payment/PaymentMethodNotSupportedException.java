package com.springboot.exception.payment;

public class PaymentMethodNotSupportedException extends PaymentException {
    public PaymentMethodNotSupportedException(String message) {
        super(message);
    }
}
