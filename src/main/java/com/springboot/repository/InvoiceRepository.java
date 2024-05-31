package com.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.model.entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

	Invoice findByOrderId(Long orderId);
}
