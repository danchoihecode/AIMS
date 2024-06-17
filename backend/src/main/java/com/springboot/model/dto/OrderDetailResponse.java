package com.springboot.model.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.springboot.model.dto.CartProductResponse.CartProductDTO;
import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.DeliveryInfo;

import lombok.Data;

@Data
public class OrderDetailResponse {

	private List<CartProductDTO> allCartProducts;

	private DeliveryInfo deliveryInfo;

	private Double normalShippingFees;
	private Double rushShippingFees;

	private Double totalAmount;
	private String state;

	public OrderDetailResponse(List<CartProduct> cartProducts, DeliveryInfo deliveryInfo, Double normalShippingFees,
			Double rushShippingFees, String state, Double totalAmount) {
		this.allCartProducts = cartProducts.stream().map(CartProductDTO::new).collect(Collectors.toList());
		this.deliveryInfo = deliveryInfo;
		this.normalShippingFees = normalShippingFees;
		this.rushShippingFees = rushShippingFees;
		this.state = state;
		this.totalAmount = totalAmount;
	}

}
