package com.springboot.exception.payment.vnpay;

import com.springboot.exception.payment.PaymentException;

public class VNPayException extends PaymentException {
    public VNPayException(String message) {
        super(message);
    }
    public VNPayException() {
        super("ERROR: Something went wrong!");
    }
}
