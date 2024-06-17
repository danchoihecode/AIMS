package com.springboot.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ViewProductResponse {
    private String productName;
    private int qty;
    private double unitPrice;
    private double total;
}
