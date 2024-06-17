package com.springboot.controller;

import com.springboot.common.Constant;
import com.springboot.dto.CartProductDTO;
import com.springboot.model.entity.Cart;
import com.springboot.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/cart")
public class CartController {
	@Autowired
	private CartService cartService;
	@GetMapping("/new")
	public Cart getAllProductsInCart() {
		return cartService.createEmptyCart();
	}
	@GetMapping()
	public List<CartProductDTO> getAllProductsInCart(@RequestParam("cartId") Long cartId) {
		return cartService.getAllProductsInCart(cartId).stream().map(CartProductDTO::new).toList();
	}
//	@PostMapping("/{cartId}")
//	public ResponseEntity<String> updatedCart(@RequestBody List<CartProductDTO> cartItems, @PathVariable("cartId") Long cartId) {
//		try {
//			for (CartProductDTO cartItem : cartItems) {
//				cartService.updateCart(cartId, cartItem.getProductId(), cartItem.getQuantity());
//			}
//			return ResponseEntity.ok("Update cart successfully");
//		} catch (Exception e) {
//			return new ResponseEntity<>("Update cart failed", HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}
	@PostMapping("/{cartId}/add")
	public String addCartItem(@RequestBody CartProductDTO item, @PathVariable("cartId") Long cartId) throws Exception {
		cartService.addItemToCart(cartId, item.getProductId(), item.getQuantity());
		return "Add cart item successfully";
	}
	@PutMapping("/{cartId}")
	public String updatedCartItem(@RequestBody CartProductDTO item, @PathVariable("cartId") Long cartId) throws Exception {
		cartService.updateCart(cartId, item.getProductId(), item.getQuantity());
		return "Update cart item successfully";
	}
	@DeleteMapping("/{cartId}")
	public String deleteCartItem(@PathVariable("cartId") Long cartId, @RequestBody Map<String, Object> body) throws Exception {
		Long productId = Long.parseLong(body.get("productId").toString());
		cartService.deleteCartItem(cartId, productId);
		return "Delete cart item successfully";
	}
	@GetMapping("/tax")
	public Double getTax() {
		return Constant.TAX_RATE;
	}

}
