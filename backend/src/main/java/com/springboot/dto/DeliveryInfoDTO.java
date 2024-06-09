package com.springboot.dto;

import com.springboot.model.entity.DeliveryInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryInfoDTO {
    private DeliveryInfo deliveryInfo;
    private Double normalShippingFee;
    private Double rushShippingFee;
    private Long cartId;
}
