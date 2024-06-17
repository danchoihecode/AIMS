package com.springboot.exception.payment.vnpay.payrequest;

import com.springboot.exception.payment.vnpay.VNPayException;

;

public class TransactionReverseException extends VNPayException {

    public TransactionReverseException() {
        super("ERROR: Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)!");
    }

}
