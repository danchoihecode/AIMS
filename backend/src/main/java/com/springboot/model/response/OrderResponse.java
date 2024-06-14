package com.springboot.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderResponse {
  private Long id;
  private String name;
  private double amount;
  private String state;
  
}
