package com.springboot.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
@AllArgsConstructor
@Data
public class UpdateCartResponse {
	String message;
	List<CartProduct> cart;
}
