package com.springboot.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.springboot.model.entity.CartProduct;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartProductDTO {
    @JsonProperty("productId")
    private Long productId;
    @JsonProperty("title")
    private String title;
    @JsonProperty("price")
    private Double price;
    @JsonProperty("quantity")
    private Integer quantity;
    @JsonProperty("imageUrl")
    private String imageUrl;
    @JsonProperty("isRushDelivery")
    private Boolean isRushDelivery;
    @JsonProperty("year")
    private Integer year;
    @JsonProperty("category")
    private String category;

    public CartProductDTO(CartProduct cartProduct) {
        this.productId = cartProduct.getProduct().getId();
        this.title = cartProduct.getProduct().getTitle();
        this.price = cartProduct.getProduct().getPrice();
        this.quantity = cartProduct.getQty();
        this.imageUrl = cartProduct.getProduct().getImage();
        this.year = cartProduct.getProduct().getYear();
        this.category = cartProduct.getProduct().getCategory();
        this.isRushDelivery = cartProduct.getProduct().getRushOrderEligible();
    }
}
