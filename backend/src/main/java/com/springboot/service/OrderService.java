package com.springboot.service;

import com.springboot.model.entity.DeliveryInfo;
import com.springboot.repository.DeliveryInfoRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.Order;
import com.springboot.model.entity.Product;
import com.springboot.model.response.OrderDetailResponse;
import com.springboot.model.response.OrderResponse;
import com.springboot.repository.CartProductRepository;
import com.springboot.repository.OrderRepository;
import com.springboot.repository.ProductRepository;


@Service
public class OrderService {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private CartProductRepository cartProductRepository;
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

	public Order findById(Long id) throws Exception {
		Order order = orderRepository.findById(id).orElseThrow(() -> new Exception("Order not found"));
		return order;
	}

	public List<OrderResponse> getAllOrders() {
		return orderRepository.findAll().stream().map(order -> new OrderResponse(order.getId(),
				order.getDeliveryInfo().getName(), order.getTotalAmount(), order.getState()))
				.collect(Collectors.toList());
	}
	public void serOrderPending(Long id) throws Exception {
		Order order = orderRepository.findById(id).orElse(null);
		if (order == null) {
			throw new Exception("Order not found with id: " + id);
		}
		if (order.getState() != null) {
			throw new Exception("Order is already in state: " + order.getState());
		}
		order.setState("Pending");
		orderRepository.save(order);
	}
	public OrderDetailResponse getOrderDetail(Long id) throws Exception {
		Optional<Order> orderOpt = orderRepository.findById(id);
		if (orderOpt.isPresent()) {
			Order order = orderOpt.get();
			List<CartProduct> cartProducts = cartProductRepository.findByCartId(order.getCart().getId());
			return new OrderDetailResponse(cartProducts, order.getDeliveryInfo(), order.getNormalShippingFees(),
					order.getRushShippingFees(), order.getState(), order.getTotalAmount());
		}
		throw new Exception("Order not found with id: " + id);
	}

	public OrderDetailResponse approveOrder(Long id) throws Exception {
		Optional<Order> orderOpt = orderRepository.findById(id);
		if (orderOpt.isPresent()) {
			Order order = orderOpt.get();
//			if (!"Pending".equals(order.getState())) {
//				throw new IllegalStateException("Order must be in pending state");
//			}

			List<CartProduct> cartProducts = cartProductRepository.findByCartId(order.getCart().getId());
			for (CartProduct cartProduct : cartProducts) {
				Product product = productRepository.findById(cartProduct.getProduct().getId())
						.orElseThrow(() -> new Exception("Product not found"));
				if (cartProduct.getQty() > product.getQtyInStock()) {
					throw new IllegalStateException(
							"Quantity in cart exceeds stock for product: " + product.getTitle());
				}
			}

			order.setState("Approved");
			orderRepository.save(order);
			return new OrderDetailResponse(cartProducts, order.getDeliveryInfo(), order.getNormalShippingFees(),
					order.getRushShippingFees(), order.getState(), order.getTotalAmount());
		}
		throw new Exception("Order not found with id: " + id);
	}

	public void rejectOrder(Long id) throws Exception {
		Optional<Order> orderOpt = orderRepository.findById(id);
		if (orderOpt.isPresent()) {
			Order order = orderOpt.get();
			order.setState("Rejected");
			orderRepository.save(order);

		}
		throw new Exception("Order not found with id: " + id);
	}
}
