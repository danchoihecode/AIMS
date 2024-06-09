package com.springboot.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import com.springboot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springboot.model.entity.Invoice;
import com.springboot.model.entity.Order;
import com.springboot.model.entity.PaymentTransaction;
import com.springboot.model.response.InvoiceDetailResponse;
import com.springboot.model.response.PaymentURLResponse;
import com.springboot.service.CartService;
import com.springboot.service.InvoiceService;
import com.springboot.subsystem.IPaymentSubsystem;
import com.springboot.subsystem.PaymentSubsystem;
import com.springboot.subsystem.vnpaysubsystem.VNPaySubsystemController;

@RestController
@RequestMapping("/payment")
public class PaymentController {

	private IPaymentSubsystem payment;
	private Invoice invoice;

	@Autowired
	InvoiceService invoiceService;
	@Autowired
	OrderService orderService;
	@Autowired
	private CartService cartService;

	public PaymentController() {
		this.payment = new PaymentSubsystem(new VNPaySubsystemController());
	}
	
	public void payOrder(Order order) {
		invoice = new Invoice(order);
	}
	
	@GetMapping("/invoice")
	public ResponseEntity<Order> getInvoiceDetail(@RequestParam Long orderId)  {
		Order order = orderService.getOrderById(orderId);
		if (order == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(order);
	}

	@PostMapping("/result")
	public ResponseEntity<Void> makePayment(@RequestBody Map<String, String> res) throws IOException, SQLException {
		PaymentTransaction transaction = payment.getPaymentTransaction(res);
		invoice.setPaymentTransaction(transaction);
		invoiceService.save(invoice);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/VNPayURL")
	public PaymentURLResponse generateURL() throws IOException {
		return new PaymentURLResponse(payment.generateURL(invoice.getAmount(), "Payment"));
	}

}