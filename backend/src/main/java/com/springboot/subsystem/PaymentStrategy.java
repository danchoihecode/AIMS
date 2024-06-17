package com.springboot.subsystem;

import java.io.IOException;
import java.util.Map;

import com.springboot.exception.PaymentException;
import com.springboot.exception.UnrecognizedException;
import com.springboot.model.entity.PaymentTransaction;
import com.springboot.model.entity.RefundTransaction;

public interface PaymentStrategy {

	PaymentTransaction getPaymentTransaction(Map<String, String> res)
			throws PaymentException, UnrecognizedException, IOException;

	String generateURL(double amount, String content) throws IOException;
	RefundTransaction refund(PaymentTransaction paymentTransaction) throws IOException;

}
