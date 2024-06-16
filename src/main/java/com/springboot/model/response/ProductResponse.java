package com.springboot.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ProductResponse {
private String productName;
private int qty;
private double unitPrice;
private double total;
}
