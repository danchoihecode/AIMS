package com.springboot.model.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class DeliveryInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	private String phone;

	private String email;
	private String address;
	private String instructions;
	private LocalDate deliveryTime;
	private boolean isRushOrder;

	public DeliveryInfo(String name, String phone, String email, String address, boolean isRushOrder) {
		super();
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.address = address;
		this.isRushOrder = isRushOrder;
	}
}
