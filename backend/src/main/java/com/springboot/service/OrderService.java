package com.springboot.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.common.Constant;
import com.springboot.exception.order.InvalidOrderCancellationException;
import com.springboot.exception.order.OrderNotFoundException;
import com.springboot.model.dto.OrderDetailResponse;
import com.springboot.model.dto.OrderResponse;
import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.Order;
import com.springboot.model.entity.Product;
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
	private OrderRepository orderRepository;
	public Order createOrder(Order order) {
		orderRepository.findByCartId(order.getCart().getId()).ifPresent(value -> orderRepository.delete(value));
		return orderRepository.save(order);
	}
	public Order getOrderById(Long orderId) {
		Order order = orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException("Order with id " + orderId + " not found"));
		return order;
	}
	public Order processPaidOrder(Long orderId) {
		Order order = getOrderById(orderId);
		order.setState(Constant.ORDER_STATUS_PENDING);
		return orderRepository.save(order);
	}

	public List<OrderResponse> getAllOrders() {
		return orderRepository.findAll().stream().map(order -> new OrderResponse(order.getId(),
				order.getDeliveryInfo().getName(), order.getTotalAmount(), order.getState()))
				.collect(Collectors.toList());
	}
	public void cancelOrder(Long id) {
		Order order = getOrderById(id);
		if (!order.getState().equals(Constant.ORDER_STATUS_PENDING)) {
			throw new InvalidOrderCancellationException("Order with id " + id + " cannot be cancelled");
		}
		order.setState(Constant.ORDER_STATUS_CANCELLED);
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
			if (!"PENDING".equals(order.getState())) {
				throw new IllegalStateException("Order must be in pending state");
			}

			List<CartProduct> cartProducts = cartProductRepository.findByCartId(order.getCart().getId());
			for (CartProduct cartProduct : cartProducts) {
				Product product = productRepository.findById(cartProduct.getProduct().getId())
						.orElseThrow(() -> new Exception("Product not found"));
				if (cartProduct.getQty() > product.getQtyInStock()) {
					throw new IllegalStateException(
							"Quantity in cart exceeds stock for product: " + product.getTitle());
				}
			}
			for (CartProduct cartProduct : cartProducts) {
				Product product = productRepository.findById(cartProduct.getProduct().getId())
						.orElseThrow(() -> new Exception("Product not found"));
				product.setQtyInStock(product.getQtyInStock() - cartProduct.getQty());
				productRepository.save(product);
			}

			order.setState("APPROVED");
			orderRepository.save(order);
			return new OrderDetailResponse(cartProducts, order.getDeliveryInfo(), order.getNormalShippingFees(),
					order.getRushShippingFees(), order.getState(), order.getTotalAmount());
		}
		throw new Exception("Order not found with id: " + id);
	}

	public OrderDetailResponse rejectOrder(Long id) throws Exception {
		Optional<Order> orderOpt = orderRepository.findById(id);
		if (orderOpt.isPresent()) {
			Order order = orderOpt.get();
			if (!"PENDING".equals(order.getState())) {
				throw new IllegalStateException("Order must be in pending state");
			}
			List<CartProduct> cartProducts = cartProductRepository.findByCartId(order.getCart().getId());

			order.setState("REJECTED");
			orderRepository.save(order);
			return new OrderDetailResponse(cartProducts, order.getDeliveryInfo(), order.getNormalShippingFees(),
					order.getRushShippingFees(), order.getState(), order.getTotalAmount());

		}
		throw new Exception("Order not found with id: " + id);
	}
}
