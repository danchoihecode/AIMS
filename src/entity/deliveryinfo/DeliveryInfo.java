package entity.deliveryinfo;

import java.time.LocalDateTime;

public class DeliveryInfo {

	private int id;
	
	private String name;

	private String phone;

	private String email;

	private String address;

	private String province;

	private String instructions;

	private LocalDateTime deliveryTime;

	private boolean isRushOrder;

	public DeliveryInfo() {

	}

	public boolean checkAddessSupportability() {
		return true;

	}

	public boolean validateDeliveryInfo() {
		return true;

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	public LocalDateTime getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(LocalDateTime deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	public boolean isRushOrder() {
		return isRushOrder;
	}

	public void setRushOrder(boolean isRushOrder) {
		this.isRushOrder = isRushOrder;
	}
	
	

}
