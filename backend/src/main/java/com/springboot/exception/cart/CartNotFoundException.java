package com.springboot.exception.cart;

public class CartNotFoundException extends CartException {
    public CartNotFoundException(String message) {
        super(message);
    }
}
