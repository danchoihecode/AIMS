package com.springboot.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.model.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
