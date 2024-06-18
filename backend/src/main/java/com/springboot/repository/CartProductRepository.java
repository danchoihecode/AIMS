package com.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.CartProductKey;

public interface CartProductRepository extends JpaRepository<CartProduct, CartProductKey> {
	 List<CartProduct> findByCartId(Long cartId);
	 List<CartProduct> findByProductId(Long productId);
}

