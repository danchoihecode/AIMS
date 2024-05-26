package common.exception;

import common.exception.RefundException;

public class RejectRefundTransactionException extends RefundException {
    public RejectRefundTransactionException() {
        super("ERROR: This transaction was not successful on VNPAY. VNPAY refuses to process the request");
    }
}
