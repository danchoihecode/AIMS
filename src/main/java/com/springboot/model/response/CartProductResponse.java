package com.springboot.model.response;

import com.springboot.model.entity.CartProduct;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartProductResponse {
    private List<CartProductDTO> allCartProducts;

    public static CartProductResponse fromCartProducts(List<CartProduct> cartProducts) {
        List<CartProductDTO> cartProductDTOs = cartProducts.stream()
            .map(CartProductDTO::new)
            .collect(Collectors.toList());
        return new CartProductResponse(cartProductDTOs);
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
