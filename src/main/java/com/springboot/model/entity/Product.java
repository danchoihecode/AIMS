package com.springboot.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "product")
@Data
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "price", nullable = false)
	private Double price;

	@Column(name = "qty_in_stock", nullable = false)
	private Integer qtyInStock;

	@Column(name = "weight", nullable = false)
	private Double weight;

	@Column(name = "image_url", nullable = false)
	private String image;

	@Column(name = "year", nullable = false)
	private Integer year;

	@Column(name = "category", nullable = false)
	private String category;

	@Column(name = "rush_order_eligible", nullable = false)
	private Boolean rushOrderEligible;

}
