package com.springboot.exception.payment.vnpay.payrequest;

import com.springboot.exception.payment.vnpay.VNPayException;

public class TransactionFailedException extends VNPayException {

    public TransactionFailedException() {
        super("ERROR: Giao dịch thất bại!");
    }

}
