package com.springboot.service;

import com.springboot.model.entity.Order;
import com.springboot.repository.PaymentTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.model.entity.Invoice;
import com.springboot.model.entity.PaymentTransaction;
import com.springboot.repository.InvoiceRepository;

@Service
public class InvoiceService {

	@Autowired
	InvoiceRepository invoiceRepository;
	@Autowired
	PaymentTransactionRepository paymentTransactionRepository;

	public void save(Invoice invoice) {
		invoiceRepository.save(invoice);

	}

	public PaymentTransaction getPaymentTransactionByOrderId(Long orderId) {

		Invoice invoice = invoiceRepository.findByOrderId(orderId);

        return invoice.getPaymentTransaction();

	}
	public Invoice getInvoiceByOrderId(Long orderId) {
		return invoiceRepository.findByOrderId(orderId);
	}
	public void saveInvoice(Invoice invoice, PaymentTransaction transaction) {
		paymentTransactionRepository.save(transaction);
		invoiceRepository.save(invoice);
	}
	public void createInvoice(Order order, PaymentTransaction transaction) {
		Invoice invoice = new Invoice(order, transaction);
		invoiceRepository.save(invoice);
	}
	public void cancelInvoice(Invoice invoice) {
		invoiceRepository.delete(invoice);
	}
}
