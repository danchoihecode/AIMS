package com.springboot.model.dto;

import com.springboot.model.entity.DeliveryInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryInfoDTO {
    private DeliveryInfo deliveryInfo;
    private ShippingFeeDTO shippingFee;
    private Long cartId;
}
