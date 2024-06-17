package com.springboot.exception.payment.vnpay.refundrequest;

import com.springboot.exception.payment.vnpay.VNPayException;

public class InvalidRefundRequestDataException extends VNPayException {
    public InvalidRefundRequestDataException() {
        super("ERROR: INVALID REFUND REQUEST DATA");
    }
}
