package com.springboot.exception.payment.vnpay.refundrequest;

import com.springboot.exception.payment.vnpay.VNPayException;

public class NotFoundTransactionException extends VNPayException {
    public NotFoundTransactionException() {
        super("ERROR: NOT FOUND TRANSACTION");
    }
}
