package com.springboot.model.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	@JoinColumn(name = "cart_id", referencedColumnName = "id")
	private Cart cart;

	private double shippingFees;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "delivery_info_id", referencedColumnName = "id")
	private DeliveryInfo deliveryInfo;

	public Order(Cart cart, double shippingFees, DeliveryInfo deliveryInfo) {
		this.cart = cart;
		this.shippingFees = shippingFees;
		this.deliveryInfo = deliveryInfo;
	}

	public double getTotalAmount() {
		return cart.getSubTotal() * 1.1 + shippingFees;
	}
}
