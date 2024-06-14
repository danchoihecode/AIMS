package com.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.model.entity.Invoice;
import com.springboot.model.entity.PaymentTransaction;
import com.springboot.repository.InvoiceRepository;

@Service
public class InvoiceService {

	@Autowired
	InvoiceRepository invoiceRepository;

	public void save(Invoice invoice) {
		invoiceRepository.save(invoice);

	}

	public PaymentTransaction getPaymentTransactionByOrderId(Long orderId) {

		Invoice invoice = invoiceRepository.findByOrderId(orderId);

		PaymentTransaction paymentTransaction = invoice.getPaymentTransaction();

		return paymentTransaction;

	}
}
