package entity.order;

import java.time.LocalDateTime;

import entity.cart.Cart;
import entity.deliveryinfo.DeliveryInfo;

public class Order {

	private int id;

	private Cart cart;

	private DeliveryInfo deliveryInfo;

	private int shippingFee;

	public Order(Cart cart, DeliveryInfo deliveryInfo, int shippingFee) {

	}

	public boolean checkRushOrderSupportability() {
		return false;
	}

	public void updateOrder(LocalDateTime deliveryTime, String deliveryInstructions) {

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public DeliveryInfo getDeliveryInfo() {
		return deliveryInfo;
	}

	public void setDeliveryInfo(DeliveryInfo deliveryInfo) {
		this.deliveryInfo = deliveryInfo;
	}

	public int getShippingFee() {
		return shippingFee;
	}

	public void setShippingFee(int shippingFee) {
		this.shippingFee = shippingFee;
	}

}
