package com.springboot.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.model.entity.Cart;
import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.DeliveryInfo;
import com.springboot.model.entity.Order;
import com.springboot.model.response.CartProductResponse;
import com.springboot.model.response.RushDeliveryCheckResponse;
import com.springboot.service.CartService;
import com.springboot.service.OrderService;
import com.springboot.service.ProductService;

@RestController
@RequestMapping
public class PlaceOrderController {
	
	@Autowired
	private PaymentController paymentController;
	private Order order;
	private Double shippingFee;
	@Autowired
	private CartService cartService;
	@Autowired
	private OrderService orderService;
	@Autowired
	private ProductService productService;

	//test for pay order
	@GetMapping("/pay")
	public ResponseEntity<Void> payOrder() {
		
		try {
			Cart cart = cartService.findById((long) 1);
            order = new Order(cart,20000,30000,new DeliveryInfo("Ha","0123", "a@gmail.com","HN", false));
			paymentController.payOrder(order);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok().build();
	}

	// test for cart delivery
	@GetMapping("/cart/delivery")
	public ResponseEntity<CartProductResponse> getCartDelivery(@RequestBody Map<String, Object> request) {
		try {
			Long cartId = Long.valueOf(request.get("cartId").toString());
			List<CartProduct> cartProducts = cartService.getAllProductsInCart(cartId);
//			return ResponseEntity.ok(order);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.notFound().build();
		}
		return null;
	}

	// test for check rush delivery
	@GetMapping("/cart/delivery/checkRushOrder")
	public ResponseEntity<RushDeliveryCheckResponse> checkRushOrder(@RequestBody Map<String, Object> request) {
		try {
			Integer province = null;
			Long cartId = Long.valueOf(request.get("cartId").toString());
			if (request.get("province") != null) {
				province = Integer.valueOf(request.get("province").toString());
			}
			Boolean isRushDelivery = Boolean.valueOf(request.get("isRushDelivery").toString());

			Cart cart = cartService.findById((long) 1);
			order = new Order(cart, 0, 0, new DeliveryInfo("Ha","0123", "a@gmail.com","HN", false));
			if (province == null) {
				RushDeliveryCheckResponse response = new RushDeliveryCheckResponse(0, 0, false);
				return ResponseEntity.ok(response);
			}
			else if (isRushDelivery == false || province != 1) {
				List<CartProduct> cartProducts = cartService.getAllProductsInCart(cartId);
				double normalShippingFee = calculateNormalShippingFee(cartProducts, province);
				RushDeliveryCheckResponse response = new RushDeliveryCheckResponse(normalShippingFee, 0, false);
				return ResponseEntity.ok(response);
			}
			else {
				List<CartProduct> rushDeliveryProducts = getRushDeliveryProducts(cartService.getAllProductsInCart(cartId));
				double normalShippingFee = calculateNormalShippingFee(rushDeliveryProducts, province);
				double rushShippingFee = calculateRushShippingFee(rushDeliveryProducts, province);
				RushDeliveryCheckResponse response = new RushDeliveryCheckResponse(normalShippingFee, rushShippingFee, false);
				return ResponseEntity.ok(response);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping("/cart/delivery/submit")
	public ResponseEntity<Void> submitDeliveryForm(@RequestBody Map<String, Object> request) {
		return ResponseEntity.ok().build();
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

	public boolean validateAddressPlaceRushOrder(Long province, String address) {
		if (!validateAddress(address))
			return false;
		if(province != 1)
			return false;
		return true;
	}

	public double calculateNormalShippingFee(List<CartProduct> cartProducts, Integer province) {
    double totalPrice = calculateTotalPrice(cartProducts);
		double maxWeight = findProductWithMaxWeight(cartProducts);
		int baseRate;
    int additionalFeePerHalfKg = 2500;  // Additional fee for every subsequent 0.5kg
		double shippingFee;
		// if the province is Hanoi or Ho Chi Minh city
		if (province == 1 || province == 79) {
			baseRate = 22000; // Initial price for the first 3kg
			if (maxWeight <= 3) {
				shippingFee = baseRate;	
			} else {
				shippingFee = baseRate + Math.ceil((maxWeight - 3) / 0.5) * additionalFeePerHalfKg;
			}
		} else {
			baseRate = 30000; // Initial price for the first 0.5kg
			if (maxWeight <= 0.5) {
				shippingFee = baseRate;
			} else {
				shippingFee = baseRate + Math.ceil((maxWeight - 0.5) / 0.5) * additionalFeePerHalfKg;
			}
		}
		// Apply free shipping if total price exceeds 100,000 VND, up to a maximum of 25,000 VND
		if (totalPrice > 100000) {
			shippingFee = Math.max(shippingFee - 25000, 0);
		}
		return shippingFee;
  }
  
  public double calculateRushShippingFee(List<CartProduct> cartProducts, Integer province) {
		int baseRate;
    int additionalFeePerHalfKg = 2500;  // Additional fee for every subsequent 0.5kg
		double maxWeight = findProductWithMaxWeight(cartProducts);
		double shippingFee;
		if (province == 1 || province == 79) {
			baseRate = 22000; // Initial price for the first 3kg
			if (maxWeight <= 3) {
				shippingFee = baseRate;
			} else {
				shippingFee = baseRate + Math.ceil((maxWeight - 3) / 0.5) * additionalFeePerHalfKg;
			}
		} else {
			baseRate = 30000; // Initial price for the first 0.5kg
			if (maxWeight <= 0.5) {
				shippingFee = baseRate;
			} else {
				shippingFee = baseRate + Math.ceil((maxWeight - 0.5) / 0.5) * additionalFeePerHalfKg;
			}
		}
		shippingFee += cartProducts.size() * 10000;
		return shippingFee;
  }

	public double findProductWithMaxWeight(List<CartProduct> cartProducts) {
		return cartProducts.stream()
			.mapToDouble(cartProduct -> cartProduct.getProduct().getWeight() * cartProduct.getQty())
			.max()
			.orElse(0.0);
	}

	public double calculateTotalPrice(List<CartProduct> cartProducts) {
		return cartProducts.stream()
			.mapToDouble(cartProduct -> cartProduct.getProduct().getPrice() * cartProduct.getQty())
			.sum();
	}

	public List<CartProduct> getRushDeliveryProducts(List<CartProduct> cartProducts) {
		return cartProducts.stream()
			.filter(cartProduct -> cartProduct.getProduct().isRushOrderEligible())
			.collect(Collectors.toList());
	}
}
