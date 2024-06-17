package com.springboot.service;

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
	private CartProductRepository cartProductRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private ProductRepository productRepository;

	public List<OrderResponse> getAllOrders() {
		return orderRepository.findAll().stream().map(order -> new OrderResponse(order.getId(),
				order.getDeliveryInfo().getName(), order.getTotalAmount(), order.getState()))
				.collect(Collectors.toList());
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
			if (!"Pending".equals(order.getState())) {
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

			order.setState("Approved");
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
			if (!"Pending".equals(order.getState())) {
				throw new IllegalStateException("Order must be in pending state");
			}
			List<CartProduct> cartProducts = cartProductRepository.findByCartId(order.getCart().getId());

			order.setState("Rejected");
			orderRepository.save(order);
			return new OrderDetailResponse(cartProducts, order.getDeliveryInfo(), order.getNormalShippingFees(),
					order.getRushShippingFees(), order.getState(), order.getTotalAmount());

		}
		throw new Exception("Order not found with id: " + id);
	}
}
