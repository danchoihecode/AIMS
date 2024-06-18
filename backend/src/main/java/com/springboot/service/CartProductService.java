package com.springboot.service;

import com.springboot.repository.CartProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

public class CartProductService {
    @Autowired
    private CartProductRepository cartProductRepository;

    @Transactional(readOnly = true)
    public boolean isProductInCart(Long productId) {
        return cartProductRepository.findByProductId(productId).isEmpty();
    }
}
