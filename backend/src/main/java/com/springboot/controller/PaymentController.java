package com.springboot.controller;

import java.io.IOException;
import java.util.Map;

import com.springboot.service.OrderService;
import com.springboot.service.PaymentService;
import com.springboot.subsystem.PaymentStrategyFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springboot.model.entity.Invoice;
import com.springboot.model.entity.Order;
import com.springboot.model.entity.PaymentTransaction;
import com.springboot.service.InvoiceService;
import com.springboot.subsystem.PaymentStrategy;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/payment")
public class PaymentController {
	@Autowired
	PaymentStrategyFactory paymentStrategyFactory;
	@Autowired
	InvoiceService invoiceService;
	@Autowired
	OrderService orderService;
	@Autowired
	PaymentService paymentService;
	
	@GetMapping("/invoice")
	public ResponseEntity<Order> getInvoiceDetail(@RequestParam Long orderId)  {
		Order order = orderService.getOrderById(orderId);
		if (order == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(order);
	}

	@PostMapping("/result/{orderId}")
	public String makePayment(@RequestBody Map<String, String> res, @PathVariable Long orderId) throws Exception {
		System.out.println(res);
		paymentService.savePaymentResult(orderId, res.get("paymentMethod"), res);
		return "Payment successful";
	}

	@GetMapping("/pay")
	public String generateURL(@RequestParam Long orderId, @RequestParam String paymentMethod) throws IOException{
		return paymentService.generatePaymentLink(orderId, paymentMethod);

	}
//	@GetMapping("/refund")
//	public ResponseEntity<Void> refund(@RequestParam Long orderId) throws IOException {
//		PaymentStrategy payment = new PaymentSubsystem(new VNPaySubsystemController());
//
//		RefundTransaction refundTransaction = payment.refund(null);
//		return ResponseEntity.ok().build();
//	}

}
