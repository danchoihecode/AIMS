package com.springboot.controller;

import com.springboot.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/customer/payment")
public class PaymentController {
	@Autowired
	PaymentService paymentService;

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

	@PostMapping("/refund")
	public void cancelOrder(@RequestBody Map<String, Long> reqBody) throws IOException {
		paymentService.refundPayment(reqBody.get("orderId"));
	}

}
