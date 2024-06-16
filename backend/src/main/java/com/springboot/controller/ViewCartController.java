package com.springboot.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.springboot.common.Constant;
import com.springboot.dto.CartProductDTO;
import com.springboot.model.entity.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springboot.model.entity.CartProduct;
import com.springboot.model.response.StockAvailabilityResponse;
import com.springboot.service.CartService;
import com.springboot.service.ProductService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/cart")
public class ViewCartController {
	@Autowired
	private CartService cartService;
	@Autowired
	private ProductService productService;
	@GetMapping("/new")
	public ResponseEntity<Cart> getAllProductsInCart() {
		return ResponseEntity.ok(cartService.createEmptyCart());
	}
	@GetMapping()
	public ResponseEntity<List<CartProductDTO>> getAllProductsInCart(@RequestParam("cartId") Long cartId) {
		List<CartProduct> cartProducts = cartService.getAllProductsInCart(cartId);
		if (cartProducts == null) {
			return ResponseEntity.notFound().build();
		}
		List<CartProductDTO> cartItems = new ArrayList<>();
		for (CartProduct cartProduct : cartProducts) {
			cartItems.add(new CartProductDTO(cartProduct));
		}
		return ResponseEntity.ok(cartItems);
	}
	@PostMapping("/{cartId}")
	public ResponseEntity<String> updatedCart(@RequestBody List<CartProductDTO> cartItems, @PathVariable("cartId") Long cartId) {
		try {
			for (CartProductDTO cartItem : cartItems) {
				cartService.updateCart(cartId, cartItem.getProductId(), cartItem.getQuantity());
			}
			return ResponseEntity.ok("Update cart successfully");
		} catch (Exception e) {
			return new ResponseEntity<>("Update cart failed", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@PostMapping("/{cartId}/add")
	public ResponseEntity<String> addCartItem(@RequestBody CartProductDTO item, @PathVariable("cartId") Long cartId) {
		try {
			boolean isAvailable = productService.checkInventory(item.getProductId(), item.getQuantity());
			if (!isAvailable) {
				return new ResponseEntity<>("Not enough product in stock", HttpStatus.BAD_REQUEST);
			}
			cartService.addItemToCart(cartId, item.getProductId(), item.getQuantity());
			return ResponseEntity.ok("Add cart item successfully");
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>("Add cart item failed", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@PutMapping("/{cartId}")
	public ResponseEntity<String> updatedCartItem(@RequestBody CartProductDTO item, @PathVariable("cartId") Long cartId) {
		try {
			boolean isAvailable = productService.checkInventory(item.getProductId(), item.getQuantity());
			if (!isAvailable) {
				return new ResponseEntity<>("Not enough product in stock", HttpStatus.BAD_REQUEST);
			}
			cartService.updateCart(cartId, item.getProductId(), item.getQuantity());
			return ResponseEntity.ok("Update cart successfully");
		} catch (Exception e) {
			System.out.println(e);
			return new ResponseEntity<>("Update cart failed", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@DeleteMapping("/{cartId}")
	public ResponseEntity<String> deleteCartItem(@PathVariable("cartId") Long cartId, @RequestBody Map<String, Object> body) {
		try {
			Long productId = Long.valueOf(body.get("productId").toString());
			cartService.deleteCartItem(cartId, productId);
			return ResponseEntity.ok("Delete cart item successfully");
		} catch (Exception e) {
			return new ResponseEntity<>("Delete cart item failed", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@GetMapping("/tax")
	public ResponseEntity<Double> getTax() {
		return ResponseEntity.ok(Constant.TAX_RATE);
	}

}
