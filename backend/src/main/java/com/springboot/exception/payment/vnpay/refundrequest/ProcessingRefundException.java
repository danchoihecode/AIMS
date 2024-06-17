package com.springboot.exception.payment.vnpay.refundrequest;

import com.springboot.exception.payment.vnpay.VNPayException;

public class ProcessingRefundException extends VNPayException {
    public ProcessingRefundException() {
        super("ERROR: The transaction has previously been submitted for a refund. This request is being processed by VNPAY");
    }
}
