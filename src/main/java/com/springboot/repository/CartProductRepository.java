package com.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.model.CartProduct;
import com.springboot.model.CartProductKey;

public interface CartProductRepository extends JpaRepository<CartProduct, CartProductKey> {
	 List<CartProduct> findByCartId(Long cartId);
}

