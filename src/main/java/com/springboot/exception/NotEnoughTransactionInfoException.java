package com.springboot.exception;

public class NotEnoughTransactionInfoException extends PaymentException {
public NotEnoughTransactionInfoException() {
	super("ERROR: Not Enough Transcation Information");
}
}
