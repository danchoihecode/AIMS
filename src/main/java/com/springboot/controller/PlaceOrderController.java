package com.springboot.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.model.entity.Cart;
import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.DeliveryInfo;
import com.springboot.model.entity.Order;
import com.springboot.model.request.DeliveryFormRequest;
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
			order = new Order(cart, 0, new DeliveryInfo("Hai","0123", "a@gmail.com","HN", false));
			paymentController.payOrder(order);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok().build();
	}

	// test for check rush delivery
	@GetMapping("/cart/delivery/checkRushOrder/{orderId}")
	public ResponseEntity<RushDeliveryCheckResponse> checkRushOrder(@PathVariable Long orderId, @RequestBody Long province, @RequestBody Long cartID, @RequestBody boolean isRushDelivery) {
		try {
			Cart cart = cartService.findById(cartID);
			order = new Order(cart, 0, new DeliveryInfo("Hai","0123", "a@gmail.com","HN", false));
			if (province == null) {
				RushDeliveryCheckResponse response = new RushDeliveryCheckResponse(0, 0, false);
				return ResponseEntity.ok(response);
			}
			else if (isRushDelivery == false) {
				int normalShippingFee = 10;
				int rushShippingFee = 0;
				RushDeliveryCheckResponse response = new RushDeliveryCheckResponse(normalShippingFee, rushShippingFee, false);
				return ResponseEntity.ok(response);
			}
			else {
				if (province != 1) {
					RushDeliveryCheckResponse response = new RushDeliveryCheckResponse(10, 0, true);
					return ResponseEntity.ok(response);
				}
				else {
					RushDeliveryCheckResponse response = new RushDeliveryCheckResponse(10, 10, false);
					return ResponseEntity.ok(response);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping("/cart/delivery/submit")
	public ResponseEntity<Void> submitDeliveryForm(@RequestBody DeliveryFormRequest deliveryFormRequest) {
		orderService.submitDeliveryForm(deliveryFormRequest);
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
}
