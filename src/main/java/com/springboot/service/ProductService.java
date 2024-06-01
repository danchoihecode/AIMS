package com.springboot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.model.entity.CartProduct;
import com.springboot.model.entity.Product;
import com.springboot.repository.ProductRepository;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public boolean checkInventory(Long productId, Integer qty) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new Exception("Product not found"));
        return product.getQtyInStock() >= qty;
    }
}

