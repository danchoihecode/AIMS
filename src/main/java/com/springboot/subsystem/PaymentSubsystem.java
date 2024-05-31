package com.springboot.subsystem;

import java.io.IOException;
import java.util.Map;

import com.springboot.exception.PaymentException;
import com.springboot.exception.UnrecognizedException;
import com.springboot.model.entity.PaymentTransaction;
import com.springboot.model.entity.RefundTransaction;

public class PaymentSubsystem implements IPaymentSubsystem {

	private IPaymentSubsystem controller;

	public PaymentSubsystem(IPaymentSubsystem controller) {
		this.controller = controller;
	}

	@Override
	public PaymentTransaction getPaymentTransaction(Map<String, String> res)
			throws PaymentException, UnrecognizedException, IOException {
		return controller.getPaymentTransaction(res);
	}

	@Override
	public String generateURL(double amount, String content) throws IOException {
		return controller.generateURL(amount, content);
	}

	@Override
	public RefundTransaction refund(PaymentTransaction paymentTransaction) throws IOException {
		return controller.refund(paymentTransaction);
	}
}
