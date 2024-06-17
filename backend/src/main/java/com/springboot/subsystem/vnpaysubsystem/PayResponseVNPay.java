package com.springboot.subsystem.vnpaysubsystem;

import java.util.Map;

import com.springboot.exception.payment.vnpay.VNPayException;
import com.springboot.exception.payment.vnpay.payrequest.AnonymousTransactionException;
import com.springboot.exception.payment.vnpay.payrequest.ProcessingException;
import com.springboot.exception.payment.vnpay.payrequest.RejectedTransactionException;
import com.springboot.exception.payment.vnpay.payrequest.SendToBankException;
import com.springboot.exception.payment.vnpay.payrequest.TransactionFailedException;
import com.springboot.exception.payment.vnpay.payrequest.TransactionNotDoneException;
import com.springboot.exception.payment.vnpay.payrequest.TransactionReverseException;
import com.springboot.model.entity.PaymentTransaction;

public class PayResponseVNPay {
    private final Map<String, String> response;

    public PayResponseVNPay(Map<String, String> response) {
        this.response = response;
    }

    public PaymentTransaction getPaymentTransaction() {
        if (response == null) {
            return null;
        }
        // Create Payment transaction
        String errorCode = response.get("vnp_TransactionStatus");
        String transactionId = response.get("vnp_TransactionNo");
        String transactionContent = response.get("vnp_OrderInfo");
        int amount = Integer.parseInt(response.get("vnp_Amount")) / 100;
        String createdAt = response.get("vnp_PayDate");
        String vnpTxnRef = response.get("vnp_TxnRef");

        PaymentTransaction trans = PaymentTransaction.builder()
                .errorCode(errorCode)
                .transactionId(transactionId)
                .transactionContent(transactionContent)
                .amount(amount)
                .createdAt(createdAt)
                .transactionNum(vnpTxnRef)
                .paymentMethod("VNPay")
                .build();

        switch (trans.getErrorCode()) {
            case "00":
                break;
            case "01":
                throw new TransactionNotDoneException();
            case "02":
                throw new TransactionFailedException();
            case "04":
                throw new TransactionReverseException();
            case "05":
                throw new ProcessingException();
            case "09":
                throw new RejectedTransactionException();
            case "06":
                throw new SendToBankException();
            case "07":
                throw new AnonymousTransactionException();
            default:
                throw new VNPayException();
        }
        return trans;
    }
}
