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
	private Long province;

	public DeliveryInfo() {}

	public DeliveryInfo(String name, String phone, String email, String address, boolean isRushOrder) {
		super();
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.address = address;
		this.isRushOrder = isRushOrder;
	}

	public DeliveryInfo(String name, String phone, String email, Long province, String instructions, String address, LocalDate deliveryTime,
			boolean isRushOrder) {
		super();
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.province = province;
		this.instructions = instructions;
		this.address = address;
		this.deliveryTime = deliveryTime;
		this.isRushOrder = isRushOrder;
	}

	public boolean isValid() {
		return validateName(this.name) && validatePhoneNumber(this.phone) && validateAddress(this.address) && validateEmail(this.email)
			&& validateInstructions(this.instructions) && validateDeliveryTime(this.deliveryTime);
	}

	public boolean validatePhoneNumber(String phoneNumber) {
		if (phoneNumber.length() != 10)
			return false;
		if (Character.compare(phoneNumber.charAt(0), '0') != 0)
			return false; 
		try {
			Integer.parseInt(phoneNumber);
		} catch (NumberFormatException e) {
			return false;
		}
		return true;
	}

	public boolean validateName(String name) {
		if (name == null)
			return false;
		if (name.trim().length() == 0)
			return false;
		if (name.matches("^[a-zA-Z ]*$") == false)
			return false;
		return true;
	}

	public boolean validateAddress(String address) {
		if (address == null)
			return false;
		if (address.trim().length() == 0)
			return false;
		if (address.matches("^[a-zA-Z ]*$") == false)
			return false;
		return true;
	}

	public boolean validateEmail(String email) {
		if (email == null)
			return false;
		if (email.trim().length() == 0)
			return false;
		if (email.matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$") == false)
			return false;
		return true;
	}

	public boolean validateInstructions(String instructions) {
		if (instructions == null)
			return false;
		if (instructions.trim().length() == 0)
			return false;
		return true;
	}

	public boolean validateDeliveryTime(LocalDate deliveryTime) {
		if (deliveryTime == null)
			return false;
		if (deliveryTime.isBefore(LocalDate.now()))
			return false;
		return true;
	}
}
