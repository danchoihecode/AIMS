package com.springboot.exception.payment.vnpay.refundrequest;

import com.springboot.exception.payment.vnpay.VNPayException;

public class InvalidIdentifierException extends VNPayException {
    public InvalidIdentifierException() {
        super("ERROR: INVALID IDENTIFIER");
    }
}
