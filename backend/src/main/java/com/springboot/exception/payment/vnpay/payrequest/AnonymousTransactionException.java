package com.springboot.exception.payment.vnpay.payrequest;

import com.springboot.exception.payment.vnpay.VNPayException;

;

public class AnonymousTransactionException extends VNPayException {
    public AnonymousTransactionException() {
        super("ERROR: Giao dịch bị nghi ngờ gian lận");
    }
}
