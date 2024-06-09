package com.springboot.controller;


import com.springboot.model.entity.Order;
import com.springboot.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderService orderService;
    @GetMapping("")
    public ResponseEntity<Order> getOrderById(@RequestParam Long orderId) {

        Order order = orderService.getOrderById(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        System.out.println(order);
        return ResponseEntity.ok(order);
    }

}
