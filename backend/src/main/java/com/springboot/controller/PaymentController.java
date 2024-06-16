package com.springboot.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

import com.springboot.model.entity.RefundTransaction;
import com.springboot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/payment")
public class PaymentController {

	private IPaymentSubsystem payment;
	private Invoice invoice;
	@Autowired
	InvoiceService invoiceService;
	@Autowired
	OrderService orderService;
	
	@GetMapping("/invoice")
	public ResponseEntity<Order> getInvoiceDetail(@RequestParam Long orderId)  {
		Order order = orderService.getOrderById(orderId);
		if (order == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(order);
	}

	@PostMapping("/result/{orderId}")
	public ResponseEntity<Void> makePayment(@RequestBody Map<String, String> res, @PathVariable Long orderId) throws Exception {
		System.out.println(res);
		PaymentTransaction transaction = payment.getPaymentTransaction(res);
		Order order = orderService.getOrderById(orderId);
		if (order == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		if (transaction.getErrorCode().equals("00")) {
			orderService.serOrderPending(orderId);
		}
		Invoice invoice = new Invoice(order);
		invoice.setPaymentTransaction(transaction);
		invoiceService.saveInvoice(invoice, transaction);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/VNPayURL")
	public ResponseEntity<String> generateURL(@RequestParam Long orderId, @RequestParam String paymentMethod) throws IOException{
		if (!paymentMethod.equals("VNPay")) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		IPaymentSubsystem vnPay = new PaymentSubsystem(new VNPaySubsystemController());
		Order order = orderService.getOrderById(orderId);
		if (order == null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(vnPay.generateURL(order.getTotalAmount(), "Thanh toán đơn hàng " + order.getId()), HttpStatus.OK);
	}
	@GetMapping("/refund")
	public ResponseEntity<Void> refund(@RequestParam Long orderId) throws IOException {
		IPaymentSubsystem payment = new PaymentSubsystem(new VNPaySubsystemController());

		RefundTransaction refundTransaction = payment.refund(null);
		return ResponseEntity.ok().build();
	}

}
