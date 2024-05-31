package com.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.model.CartProductKey;
import com.springboot.model.entity.CartProduct;

public interface CartProductRepository extends JpaRepository<CartProduct, CartProductKey> {
	 List<CartProduct> findByCartId(Long cartId);
}

