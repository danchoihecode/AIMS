package com.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.model.Cart;
import com.springboot.model.CartProduct;
import com.springboot.model.CartProductKey;
import com.springboot.model.Product;
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

	public List<CartProduct> getAllProductsInCart(Long cartId) {
		return cartProductRepository.findByCartId(cartId);
	}

	public List<CartProduct> updateCart(Long cartId, Long productId, Integer qty) throws Exception {
		Product product = productRepository.findById(productId).orElseThrow(() -> new Exception("Product not found"));
		Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new Exception("Cart not found"));

		CartProductKey key = new CartProductKey(cartId, productId);

		CartProduct cartProduct = cartProductRepository.findById(key).orElse(new CartProduct(key, cart, product, 0));

		cartProduct.setQty(qty);

		cartProductRepository.save(cartProduct);

		List<CartProduct> cartProducts = cartProductRepository.findByCartId(cart.getId());
		double subTotal = cartProducts.stream().mapToDouble(cp -> cp.getProduct().getPrice() * cp.getQty()).sum();

		cart.setSubTotal(subTotal);
		cartRepository.save(cart);

		return cartProducts;
	}

}
