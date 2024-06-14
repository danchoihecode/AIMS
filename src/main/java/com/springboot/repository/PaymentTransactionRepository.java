package com.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.model.entity.PaymentTransaction;

public interface PaymentTransactionRepository  extends JpaRepository<PaymentTransaction,Long >{

}
