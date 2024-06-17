package com.springboot.exception.payment.vnpay.payrequest;

import com.springboot.exception.payment.vnpay.VNPayException;

;

public class SendToBankException extends VNPayException {
    public SendToBankException() {
        super("ERROR: VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)");
    }
}
