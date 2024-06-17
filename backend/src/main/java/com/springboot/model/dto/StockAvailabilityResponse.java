package com.springboot.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class StockAvailabilityResponse {
	Long productId;
	Integer qty;
	boolean available;
}
