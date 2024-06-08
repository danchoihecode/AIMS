package com.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.model.response.OrderDetailResponse;
import com.springboot.model.response.OrderResponse;
import com.springboot.service.OrderService;

@RestController
@RequestMapping("/admin")
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

	@PostMapping("/update-order")
	public ResponseEntity<?> updateOrder(@RequestBody Map<String, Object> request) {
		Long id = Long.valueOf(request.get("id").toString());
		String state = request.get("state").toString();
		try {
			OrderDetailResponse orderDetail = orderService.updateOrderState(id, state);
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
