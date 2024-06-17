package com.springboot.controller;


import com.springboot.model.entity.Order;
import com.springboot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderService orderService;
    @GetMapping("")
    public Order getOrderById(@RequestParam Long orderId) {
        return orderService.getOrderById(orderId);
    }
    @PostMapping("/cancel")
    public void cancelOrder(@RequestBody Map<String, Long> reqBody) throws IOException {
        orderService.cancelOrder(reqBody.get("orderId"));
    }

}
