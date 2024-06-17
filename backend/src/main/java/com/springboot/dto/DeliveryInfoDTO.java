package com.springboot.dto;

import com.springboot.model.entity.DeliveryInfo;
import com.springboot.model.response.ShippingFeeDTO;
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
