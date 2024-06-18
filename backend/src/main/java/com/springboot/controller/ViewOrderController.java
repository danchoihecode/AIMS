package com.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.model.dto.OrderDetailResponse;
import com.springboot.model.dto.OrderResponse;
import com.springboot.service.OrderService;

@RestController
@RequestMapping("/manager")
@CrossOrigin(origins = "http://localhost:3000")
public class ViewOrderController {
	@Autowired
	private OrderService orderService;

	@GetMapping("/orders")
	public ResponseEntity<List<OrderResponse>> getAllOrders() {
		List<OrderResponse> orders = orderService.getAllOrders();
		return ResponseEntity.ok(orders);
	}

	@GetMapping("/order")
	public ResponseEntity<OrderDetailResponse> getOrderDetail(@RequestParam Long id) {
		try {
			OrderDetailResponse orderDetail = orderService.getOrderDetail(id);
			return ResponseEntity.ok(orderDetail);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/approve-order")
	public ResponseEntity<?> approveOrder(@RequestParam Long id) {
		try {
			OrderDetailResponse orderDetail = orderService.approveOrder(id);
			return ResponseEntity.ok(orderDetail);
		} catch (IllegalStateException e) {
			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("error", e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/reject-order")
	public ResponseEntity<?> rejectOrder(@RequestParam Long id) {
		try {
			OrderDetailResponse orderDetail = orderService.rejectOrder(id);
			return ResponseEntity.ok(orderDetail);
		} catch (IllegalStateException e) {
			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("error", e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}

}
