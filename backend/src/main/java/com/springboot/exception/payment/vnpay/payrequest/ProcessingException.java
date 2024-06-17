package com.springboot.exception.payment.vnpay.payrequest;

import com.springboot.exception.payment.vnpay.VNPayException;

;

public class ProcessingException extends VNPayException {
    public ProcessingException() {
        super("ERROR: VNPAY đang xử lý giao dịch này (GD hoàn tiền)!");
    }
}
