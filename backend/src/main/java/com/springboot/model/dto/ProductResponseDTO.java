package com.springboot.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
@Data
public class ProductResponseDTO {
    private String productName;
    private int qty;
    private double unitPrice;
    private double total;

}
