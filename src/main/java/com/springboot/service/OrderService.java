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

	// Logic to check if the order is eligible for rush delivery
	public RushDeliveryCheckResponse checkRushDelivery(Order order) {
		return null;
	}

	// // Logic to handle delivery form submission
	// public void submitDeliveryForm(DeliveryFormRequest deliveryFormRequest) {
	// // Save the delivery information to the database (implementation depends on
	// your persistence layer)
	// // For example:
	// // deliveryInfoRepository.save(new DeliveryInfo(...));
	// }

	public Order findById(Long id) throws Exception {
		Order order = orderRepository.findById(id).orElseThrow(() -> new Exception("Order not found"));
		return order;
	}
}
