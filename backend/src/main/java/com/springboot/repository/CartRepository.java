package com.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.model.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
}
