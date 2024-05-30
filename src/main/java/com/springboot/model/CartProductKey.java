package com.springboot.model;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartProductKey implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long cartId;
	private Long productId;

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		CartProductKey that = (CartProductKey) o;
		return Objects.equals(cartId, that.cartId) && Objects.equals(productId, that.productId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(cartId, productId);
	}
}