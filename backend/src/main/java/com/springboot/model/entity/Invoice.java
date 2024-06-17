package com.springboot.model.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Invoice {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String currency;

	private double amount;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "order_id", referencedColumnName = "id")
	private Order order;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "payment_transaction_id", referencedColumnName = "id")
	private PaymentTransaction paymentTransaction;

	public Invoice(Order order) {

		this.order = order;
		this.currency = "VND";
		this.amount = order.getTotalAmount();
	}
	public Invoice(Order order, PaymentTransaction paymentTransaction) {
		this.order = order;
		this.currency = "VND";
		this.amount = order.getTotalAmount();
		this.paymentTransaction = paymentTransaction;
	}

}