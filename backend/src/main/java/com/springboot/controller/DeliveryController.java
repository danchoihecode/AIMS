package com.springboot.controller;

import com.springboot.dto.DeliveryInfoDTO;
import com.springboot.service.DeliveryService;
import com.springboot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springboot.model.entity.Cart;
import com.springboot.model.entity.Order;
import com.springboot.model.response.ShippingFeeDTO;
import com.springboot.service.CartService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/delivery")
public class DeliveryController {
    @Autowired
    private CartService cartService;

    @Autowired
    private OrderService orderService;
    @Autowired
    private DeliveryService deliveryService;


    @GetMapping("shipping-fee")
    public ShippingFeeDTO checkRushOrder(@RequestParam("cartId") Long cartId,
                                         @RequestParam("province") int province, @RequestParam("isRushDelivery") boolean isRushDelivery) {
        return deliveryService.getShippingFee(cartId, province, isRushDelivery);
    }

    @PostMapping("")
    public String submitDeliveryForm(@RequestBody DeliveryInfoDTO deliveryInfoDTO) {
        deliveryService.saveDeliveryInfo(deliveryInfoDTO.getCartId(), deliveryInfoDTO.getShippingFee(), deliveryInfoDTO.getDeliveryInfo());
        return "Delivery info saved successfully";
    }


}
