package com.springboot.service;

import com.springboot.model.entity.DeliveryInfo;
import com.springboot.repository.DeliveryInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.model.entity.Order;
import com.springboot.model.response.RushDeliveryCheckResponse;
import com.springboot.repository.OrderRepository;

import java.util.Optional;

@Service
public class OrderService {

	@Autowired
	private DeliveryInfoRepository deliveryInfoRepository;
	@Autowired
	private OrderRepository orderRepository;
	private DeliveryInfo createDeliveryInfo(DeliveryInfo deliveryInfo) {
		return deliveryInfoRepository.save(deliveryInfo);
	}
	public Order createOrder(Order order) {
		Optional<Order> existingOrder = orderRepository.findByCartId(order.getCart().getId());
        existingOrder.ifPresent(value -> orderRepository.delete(value));
		DeliveryInfo deliveryInfo = order.getDeliveryInfo();
		if (deliveryInfo != null) {
			deliveryInfo = createDeliveryInfo(deliveryInfo);
			order.setDeliveryInfo(deliveryInfo);
		}
		return orderRepository.save(order);
	}
	public Order getOrderById(Long orderId) {
		return orderRepository.findById(orderId).orElse(null);
	}
}
