package com.springboot.model.response;

import java.util.List;
import java.util.stream.Collectors;

import com.springboot.model.entity.CartProduct;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class UpdateCartResponse {
	private String message;
	private List<CartProductDTO> allCartProducts;

    public static UpdateCartResponse fromCartProducts(String msg,List<CartProduct> cartProducts) {
        List<CartProductDTO> cartProductDTOs = cartProducts.stream()
            .map(CartProductDTO::new)
            .collect(Collectors.toList());
        return new UpdateCartResponse(msg,cartProductDTOs);
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CartProductDTO {
        private Long id;
        private String title;
        private Double price;
        private Integer quantity;
        private String imageUrl;
        private Boolean isRushDelivery;

        public CartProductDTO(CartProduct cartProduct) {
            this.id = cartProduct.getProduct().getId();
            this.title = cartProduct.getProduct().getTitle();
            this.price = cartProduct.getProduct().getPrice();
            this.quantity = cartProduct.getQty();
            this.imageUrl = cartProduct.getProduct().getImage();
            this.isRushDelivery = cartProduct.getProduct().getRushOrderEligible();
        }
    }
	
	
}
