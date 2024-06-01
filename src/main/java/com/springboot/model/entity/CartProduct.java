package com.springboot.model.entity;

import com.springboot.model.CartProductKey;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart_product")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartProduct {
	@EmbeddedId
	private CartProductKey id;

	@ManyToOne(fetch = FetchType.EAGER)
	@MapsId("cartId")
	@JoinColumn(name = "cart_id")
	private Cart cart;

	@ManyToOne(fetch = FetchType.EAGER)
	@MapsId("productId")
	@JoinColumn(name = "product_id")
	private Product product;

	@Column(name = "qty", nullable = false)
	private Integer qty;
}
