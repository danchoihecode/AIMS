package com.springboot.vnpaysubsystem;

import java.io.IOException;
import java.util.Map;

import com.springboot.model.entity.PaymentTransaction;
import com.springboot.model.entity.RefundTransaction;

public class VNPaySubsystemController implements IPaymentSubsystem {


	private static VNPayBoundary vnPayBoundary = new VNPayBoundary();

	@Override
	public String generateURL(int amount, String content) throws IOException {
		return vnPayBoundary.generateURL(amount, content);
	}

	@Override
	public RefundTransaction refund(PaymentTransaction paymentTransaction) throws IOException {
		return vnPayBoundary.refund(paymentTransaction);
	}

	@Override
	public PaymentTransaction getPaymentTransaction(Map<String,String> response) {
		return vnPayBoundary.getPaymentTransaction(response);
	}


}
