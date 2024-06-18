package com.springboot.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShippingFeeDTO {
    double normalShippingFee;
    double rushShippingFee;
    boolean rushDeliveryAvailable;
}
