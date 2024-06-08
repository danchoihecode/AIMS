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
import com.springboot.model.response.RushDeliveryCheckResponse;
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

	public RushDeliveryCheckResponse checkRushDelivery(Order order) {
		return null;
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
	 public OrderDetailResponse updateOrderState(Long id, String newState) throws Exception {
	        Optional<Order> orderOpt = orderRepository.findById(id);
	        if (orderOpt.isPresent()) {
	            Order order = orderOpt.get();
	            if ("Rejected".equals(order.getState())) {
	                throw new IllegalStateException("Cannot update a rejected order");
	            }

	            if ("Approved".equals(newState)) {
	                List<CartProduct> cartProducts = cartProductRepository.findByCartId(order.getCart().getId());
	                for (CartProduct cartProduct : cartProducts) {
	                    Product product = productRepository.findById(cartProduct.getProduct().getId())
	                            .orElseThrow(() -> new Exception("Product not found"));
	                    if (cartProduct.getQty() > product.getQtyInStock()) {
	                        throw new IllegalStateException("Quantity in cart exceeds stock for product: " + product.getTitle());
	                    }
	                }
	            }

	            order.setState(newState);
	            orderRepository.save(order);
	            List<CartProduct> cartProducts = cartProductRepository.findByCartId(order.getCart().getId());
	            return new OrderDetailResponse(
	                    cartProducts,
	                    order.getDeliveryInfo(),
	                    order.getNormalShippingFees(),
	                    order.getRushShippingFees(),
	                    order.getState(),
	                    order.getTotalAmount()
	            );
	        }
	        throw new Exception("Order not found with id: " + id);
	    }
}
