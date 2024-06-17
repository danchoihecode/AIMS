package com.springboot.controller;

import com.springboot.dto.DeliveryInfoDTO;
import com.springboot.model.entity.Order;
import com.springboot.model.response.ShippingFeeDTO;
import com.springboot.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/customer/delivery")
public class DeliveryController {
    @Autowired
    private DeliveryService deliveryService;


    @GetMapping("shipping-fee")
    public ShippingFeeDTO checkRushOrder(@RequestParam("cartId") Long cartId,
                                         @RequestParam("province")String province, @RequestParam("isRushDelivery") boolean isRushDelivery) {
        return deliveryService.getShippingFee(cartId, province, isRushDelivery);
    }

    @PostMapping("")
    public Order submitDeliveryForm(@RequestBody DeliveryInfoDTO deliveryInfoDTO) {
        return deliveryService.saveDeliveryInfo(deliveryInfoDTO.getCartId(), deliveryInfoDTO.getShippingFee(), deliveryInfoDTO.getDeliveryInfo());
    }


}
