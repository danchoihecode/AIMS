package entity.cart;

import java.util.List;

public class Cart {

	private int id;

	private List<CartProduct> cartProducts;

	private double subTotal;

	public Cart() {

	}

	public boolean checkProductAvailability() {
		return false;

	}

	public void empty() {

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public List<CartProduct> getCartProducts() {
		return cartProducts;
	}

	public void setCartProducts(List<CartProduct> cartProducts) {
		this.cartProducts = cartProducts;
	}

	public double getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(double subTotal) {
		this.subTotal = subTotal;
	}

}
