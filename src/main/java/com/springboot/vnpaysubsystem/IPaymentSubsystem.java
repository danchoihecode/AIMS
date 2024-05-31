package com.springboot.vnpaysubsystem;

import java.io.IOException;
import java.util.Map;

import com.springboot.exception.PaymentException;
import com.springboot.exception.UnrecognizedException;
import com.springboot.model.entity.PaymentTransaction;
import com.springboot.model.entity.RefundTransaction;

public interface IPaymentSubsystem {

	public abstract PaymentTransaction getPaymentTransaction(Map<String,String> res)
			throws PaymentException, UnrecognizedException, IOException;

	public abstract String generateURL(int amount, String content) throws IOException;
	public abstract RefundTransaction refund(PaymentTransaction paymentTransaction) throws IOException;

}
