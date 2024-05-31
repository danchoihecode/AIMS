package com.springboot.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.model.entity.PaymentTransaction;
import com.springboot.model.response.PaymentURLResponse;
import com.springboot.subsystem.IPaymentSubsystem;
import com.springboot.subsystem.PaymentSubsystem;
import com.springboot.subsystem.vnpaysubsystem.VNPaySubsystemController;

@RestController
@RequestMapping
public class PaymentController {

	private IPaymentSubsystem payment;

	public PaymentController() {
		this.payment = new PaymentSubsystem(new VNPaySubsystemController());
	}

	public void makePayment(Map<String, String> res) throws IOException, SQLException {
		PaymentTransaction transaction = payment.getPaymentTransaction(res);
		PaymentTransaction.saveTransaction(transaction);
	}

	@GetMapping("/payment/VNPayURL")
	public PaymentURLResponse generateURL(int amount, String content) throws IOException {
		return new PaymentURLResponse(payment.generateURL(amount, content));
	}
//	public int createOrder(Order order) throws SQLException {
//		return Order.createOrder(order);
//	}
//
//	public void emptyCart(){
//		Cart.getCart().emptyCart();
//	}
}