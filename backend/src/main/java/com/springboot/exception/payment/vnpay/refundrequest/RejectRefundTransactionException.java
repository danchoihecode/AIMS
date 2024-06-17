package com.springboot.exception.payment.vnpay.refundrequest;

import com.springboot.exception.payment.vnpay.VNPayException;

public class RejectRefundTransactionException extends VNPayException {
    public RejectRefundTransactionException() {
        super("ERROR: This transaction was not successful on VNPAY. VNPAY refuses to process the request");
    }
}
