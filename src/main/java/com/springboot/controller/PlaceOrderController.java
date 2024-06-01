package com.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.model.entity.Cart;
import com.springboot.model.entity.DeliveryInfo;
import com.springboot.model.entity.Order;
import com.springboot.service.CartService;

@RestController
@RequestMapping
public class PlaceOrderController {
	
	@Autowired
	private PaymentController paymentController;
	private Order order;
	@Autowired
	private CartService cartService;

	//test for pay order
	@GetMapping("/pay")
	public ResponseEntity<Void> payOrder() {
		
		try {
			Cart cart = cartService.findById((long) 1);
			order = new Order(cart, 0, new DeliveryInfo("Hai","0123", "a@gmail.com","HN", false));
			paymentController.payOrder(order);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok().build();
		
	}
}
