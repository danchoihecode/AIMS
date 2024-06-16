package com.springboot.model.response;

import java.util.ArrayList;
import java.util.List;

import com.springboot.model.entity.Cart;
import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.DeliveryInfo;
import com.springboot.model.entity.Order;
import com.springboot.model.entity.Product;
import com.springboot.service.CartService;

import lombok.Data;

@Data
public class InvoiceDetailResponse {
	private DeliveryInfo deliveryInfo;
	private List<ProductResponseDTO> normalShipping = new ArrayList<>();
	private double normalShippingFee;
	private List<ProductResponseDTO> rushShipping = new ArrayList<>();
	private double rushShippingFee;
	private double subTotal;
	private double tax;
	private double total;

	public InvoiceDetailResponse(Order order, CartService cartService) {
		this.deliveryInfo = order.getDeliveryInfo();
		boolean isRushOrder = deliveryInfo.isRushOrder();
		this.normalShippingFee = order.getNormalShippingFees();
		this.rushShippingFee = order.getRushShippingFees();

		Cart cart = order.getCart();
		this.subTotal = cart.getSubTotal();

		List<CartProduct> cartProducts = cartService.getAllProductsInCart(cart.getId());

		for (CartProduct cartProduct : cartProducts) {
			Product product = cartProduct.getProduct();
			int qty = cartProduct.getQty();
			double totalProductPrice = product.getPrice() * qty;

			ProductResponseDTO productResponse = new ProductResponseDTO(product.getTitle(), qty, product.getPrice(),
					totalProductPrice);

			if (isRushOrder && product.isRushOrderEligible()) {
				rushShipping.add(productResponse);
			} else {
				normalShipping.add(productResponse);
			}
		}

		this.tax = this.subTotal * 0.1;
		this.total = order.getTotalAmount();
	}
}
