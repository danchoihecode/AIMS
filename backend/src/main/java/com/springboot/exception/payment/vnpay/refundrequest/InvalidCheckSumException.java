package com.springboot.exception.payment.vnpay.refundrequest;

import com.springboot.exception.payment.vnpay.VNPayException;

public class InvalidCheckSumException extends VNPayException {
    public InvalidCheckSumException() {
        super("ERROR: INVALID CHECK SUM");
    }
}
