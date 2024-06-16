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
    public ResponseEntity<Invoice> getInvoiceByOrderId(@RequestParam Long orderId) {
        Invoice invoice = invoiceService.getInvoiceByOrderId(orderId);
        if (invoice == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(invoice);
    }
    @PostMapping("/cancel")
    public ResponseEntity<Void> cancelInvoice(@RequestParam Long orderId) {
        Invoice invoice = invoiceService.getInvoiceByOrderId(orderId);
        if (invoice == null) {
            return ResponseEntity.notFound().build();
        }
        if (!invoice.getOrder().getState().equals("PENDING")) {
            return ResponseEntity.badRequest().build();
        }
        invoiceService.cancelInvoice(invoice);
        return ResponseEntity.ok().build();
    }

}
