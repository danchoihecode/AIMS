package com.springboot.exception.cart;

public class CartEmptyException extends CartException {
    public CartEmptyException(String message) {
        super(message);
    }
}
