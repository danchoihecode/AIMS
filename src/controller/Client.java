package controller;

import common.exception.PaymentException;
import entity.transactioninfo.TransactionInfo;
import subsystem.IPayment;

public class Client {

	private IPayment payment;

	public void updateTransactionOnFailure(PaymentException exception) {

	}

	public void updateTransactionOnSuccess(TransactionInfo trans) {

	}

}
