package com.springboot.model.entity;

import com.springboot.common.Constant;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "orders")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	@JoinColumn(name = "cart_id", referencedColumnName = "id")
	private Cart cart;

	private Double normalShippingFees;
	private Double rushShippingFees;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "delivery_info_id", referencedColumnName = "id")
	private DeliveryInfo deliveryInfo;
	
	private String state;

	public Order() {}
	public Order(Cart cart, double normalShippingFees, double rushShippingFees, DeliveryInfo deliveryInfo) {
		this.cart = cart;
		this.normalShippingFees = normalShippingFees;
		this.rushShippingFees = rushShippingFees;
		this.deliveryInfo = deliveryInfo;
		this.state = Constant.ORDER_STATUS_CREATED;
	}

	public Double getTotalAmount() {
		return cart.getSubTotal() * (1 + Constant.TAX_RATE) + normalShippingFees + rushShippingFees;
	}
}
