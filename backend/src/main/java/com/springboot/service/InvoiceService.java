package com.springboot.service;

import com.springboot.common.Constant;
import com.springboot.exception.order.OrderNotFoundException;
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

	public PaymentTransaction getPaymentTransactionByOrderId(Long orderId) {
		Invoice invoice = getInvoiceByOrderId(orderId);
        return invoice.getPaymentTransaction();

	}
	public Invoice getInvoiceByOrderId(Long orderId) {
		Invoice invoice = invoiceRepository.findByOrderId(orderId).orElseThrow(() -> new OrderNotFoundException("Invoice with order id " + orderId + " not found"));
		Order order = invoice.getOrder();
		if (order.getState().equals(Constant.ORDER_STATUS_CREATED)) throw new OrderNotFoundException("Order with id " + orderId + " not found");
		return invoice;
	}

	public void createInvoice(Order order, PaymentTransaction transaction) {
		Invoice invoice = new Invoice(order, transaction);
		invoiceRepository.save(invoice);
	}
	public void cancelInvoice(Invoice invoice) {
		invoiceRepository.delete(invoice);
	}
}
