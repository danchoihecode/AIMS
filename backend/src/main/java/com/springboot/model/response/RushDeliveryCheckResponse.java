package com.springboot.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RushDeliveryCheckResponse {
    double normalShippingFee;
    double rushShippingFee;
    boolean rushDeliveryAvailable;
}
