package com.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.model.entity.Order;
import com.springboot.model.response.RushDeliveryCheckResponse;
import com.springboot.repository.OrderRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;

	public RushDeliveryCheckResponse checkRushDelivery(Order order) {
		return null;
	}

	public Order findById(Long id) throws Exception {
		Order order = orderRepository.findById(id).orElseThrow(() -> new Exception("Order not found"));
		return order;
	}
}
