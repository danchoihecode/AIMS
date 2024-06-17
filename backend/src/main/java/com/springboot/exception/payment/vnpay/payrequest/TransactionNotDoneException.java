package com.springboot.exception.payment.vnpay.payrequest;

import com.springboot.exception.payment.vnpay.VNPayException;

public class TransactionNotDoneException extends VNPayException {
    public TransactionNotDoneException() {
        super("ERROR: Giao dịch chưa hoàn tất!");
    }
}
