package com.springboot.exception.product;

public class ProductQuantityNotEnoughException extends ProductException {
    public ProductQuantityNotEnoughException(String message) {
        super(message);
    }
}
