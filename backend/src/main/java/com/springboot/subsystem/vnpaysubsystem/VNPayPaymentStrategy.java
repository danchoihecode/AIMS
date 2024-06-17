package com.springboot.subsystem.vnpaysubsystem;

import com.springboot.model.entity.PaymentTransaction;
import com.springboot.model.entity.RefundTransaction;
import com.springboot.subsystem.PaymentStrategy;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@Component("VNPay")
public class VNPayPaymentStrategy implements PaymentStrategy {
    public String generateURL(double amount, String content) {
        PayRequestVNPay payRequestVNPay = new PayRequestVNPay(amount, content);
        return payRequestVNPay.generateURL();
    }
    public PaymentTransaction getPaymentTransaction(Map<String, String> res) throws UnsupportedEncodingException {
        PayResponseVNPay payResponseVNPay = new PayResponseVNPay(res);
        return payResponseVNPay.getPaymentTransaction();
    }
    public RefundTransaction refund(PaymentTransaction paymentTransaction) throws IOException {
        RefundRequestVNPay refundRequestVNPay = new RefundRequestVNPay(paymentTransaction);
        refundRequestVNPay.refund();
        return null;
    }


}
