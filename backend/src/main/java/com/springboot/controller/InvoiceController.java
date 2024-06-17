package com.springboot.controller;

import com.springboot.model.entity.Invoice;
import com.springboot.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/invoice")
public class InvoiceController {
    @Autowired
    InvoiceService invoiceService;

    @GetMapping("")
    public Invoice getInvoiceByOrderId(@RequestParam Long orderId) {
        return invoiceService.getInvoiceByOrderId(orderId);
    }

}
