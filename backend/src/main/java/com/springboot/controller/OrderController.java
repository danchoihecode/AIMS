package com.springboot.controller;


import com.springboot.model.entity.Invoice;
import com.springboot.model.entity.Order;
import com.springboot.service.InvoiceService;
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
    @Autowired
    InvoiceService invoiceService;

    @GetMapping("")
    public ResponseEntity<Order> getOrderById(@RequestParam Long orderId) {
        Order order = orderService.getOrderById(orderId);
        if (order == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(order);
    }

}
