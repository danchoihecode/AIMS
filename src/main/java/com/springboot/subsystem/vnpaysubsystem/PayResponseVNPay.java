package com.springboot.subsystem.vnpaysubsystem;

import java.util.Map;

import com.springboot.Utils;
import com.springboot.exception.AnonymousTransactionException;
import com.springboot.exception.ProcessingException;
import com.springboot.exception.RejectedTransactionException;
import com.springboot.exception.SendToBankException;
import com.springboot.exception.TransactionFailedException;
import com.springboot.exception.TransactionNotDoneException;
import com.springboot.exception.TransactionReverseException;
import com.springboot.exception.UnrecognizedException;
import com.springboot.model.entity.PaymentTransaction;

public class PayResponseVNPay {
    private Map<String, String> response;

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
        PaymentTransaction trans = new PaymentTransaction(errorCode, transactionId, transactionContent, amount, Utils.convertPaymentTimeFormat(createdAt), vnpTxnRef);

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
                throw new UnrecognizedException();
        }
        return trans;
    }
}
