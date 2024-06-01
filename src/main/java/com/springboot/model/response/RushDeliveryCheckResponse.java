package com.springboot.model.response;

import com.springboot.model.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RushDeliveryCheckResponse {
    int normalShippingFee;
    int rushShippingFee;
    boolean isRushDelivery;
}
