package com.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.model.CartProductKey;
import com.springboot.model.entity.Cart;
import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.Product;
import com.springboot.repository.CartProductRepository;
import com.springboot.repository.CartRepository;
import com.springboot.repository.ProductRepository;

@Service
public class CartService {

	@Autowired
	private CartProductRepository cartProductRepository;

	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private ProductRepository productRepository;

	public Cart createEmptyCart() {
		Cart cart = new Cart();
		cartRepository.save(cart);
		return cart;
	}
	public List<CartProduct> getAllProductsInCart(Long cartId) {
		return cartProductRepository.findByCartId(cartId);
	}

	public void updateCart(Long cartId, Long productId, Integer qty) throws Exception {
		Product product = productRepository.findById(productId).orElseThrow(() -> new Exception("Product not found"));
		Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new Exception("Cart not found"));

		CartProductKey key = new CartProductKey(cartId, productId);

		CartProduct cartProduct = cartProductRepository.findById(key).orElse(new CartProduct(key, cart, product, qty));
		cartProduct.setQty(qty);

		cartProductRepository.save(cartProduct);

		recalculateCartTotal(cart);
	}

	private void recalculateCartTotal(Cart cart) {
		List<CartProduct> cartProducts = cartProductRepository.findByCartId(cart.getId());
		double subTotal = cartProducts.stream().mapToDouble(cp -> cp.getProduct().getPrice() * cp.getQty()).sum();
		cart.setSubTotal(subTotal);
		cartRepository.save(cart);
	}
	public Cart getCartByCartId(Long id) throws Exception {
        return cartRepository.findById(id).orElseThrow(() -> new Exception("Cart not found"));
	}
	public void deleteCartItem(Long cartId, Long productId) {
		CartProductKey key = new CartProductKey(cartId, productId);
		cartProductRepository.deleteById(key);
		cartRepository.findById(cartId).ifPresent(this::recalculateCartTotal);
	}
}
