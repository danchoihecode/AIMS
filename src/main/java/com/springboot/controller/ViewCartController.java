package com.springboot.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.model.entity.CartProduct;
import com.springboot.model.response.CartProductResponse;
import com.springboot.model.response.StockAvailabilityResponse;
import com.springboot.model.response.TaxResponse;
import com.springboot.model.response.UpdateCartResponse;
import com.springboot.service.CartService;
import com.springboot.service.ProductService;

@RestController
@RequestMapping
public class ViewCartController {
	@Autowired
	private CartService cartService;
	@Autowired
	private ProductService productService;

	@GetMapping("/cart")
	public ResponseEntity<CartProductResponse> getAllProductsInCart(@RequestBody Map<String, Object> request) {
		Long cartId = Long.valueOf(request.get("cartId").toString());
		List<CartProduct> cartProducts = cartService.getAllProductsInCart(cartId);
		if (cartProducts == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(CartProductResponse.fromCartProducts(cartProducts));
	}

	@PostMapping("/cart")
	public ResponseEntity<UpdateCartResponse> updateCart(@RequestBody Map<String, Object> request) {
		Long productId = Long.valueOf(request.get("product_id").toString());
		Integer qty = Integer.valueOf(request.get("qty").toString());
		Long cartId = Long.valueOf(request.get("cartId").toString());

		try {
			List<CartProduct> cart = cartService.updateCart(cartId, productId, qty);

			return ResponseEntity.ok(UpdateCartResponse.fromCartProducts("Cart updated successfully", cart));
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/inventory/check")
	public ResponseEntity<StockAvailabilityResponse> checkQtyInStock(@RequestParam("product_id") Long productId,
			@RequestParam("qty") Integer qty) {
		try {
			boolean isAvailable = productService.checkInventory(productId, qty);
			return ResponseEntity.ok(new StockAvailabilityResponse(productId, qty, isAvailable) );
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping(value = "/tax")
	public ResponseEntity<TaxResponse> getTax() {
		return ResponseEntity.ok(new TaxResponse(10));
	}
}
