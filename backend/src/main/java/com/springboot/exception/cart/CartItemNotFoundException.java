package com.springboot.exception.cart;

public class CartItemNotFoundException extends CartException {
    public CartItemNotFoundException(String message) {
        super(message);
    }
}
