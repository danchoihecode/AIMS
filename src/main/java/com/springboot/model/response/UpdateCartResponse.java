package com.springboot.model.response;

import java.util.List;

import com.springboot.model.CartProduct;

import lombok.AllArgsConstructor;
import lombok.Data;
@AllArgsConstructor
@Data
public class UpdateCartResponse {
	String message;
	List<CartProduct> cart;
}
