package com.springboot.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.model.entity.Order;
import com.springboot.service.OrderService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/customer/order")
public class OrderController {
    @Autowired
    OrderService orderService;
    @GetMapping("")
    public Order getOrderById(@RequestParam Long orderId) {
        return orderService.getOrderById(orderId);
    }
}
