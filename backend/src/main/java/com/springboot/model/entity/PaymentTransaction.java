package com.springboot.model.entity;

import java.sql.SQLException;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentTransaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String errorCode;
	private String transactionId;
	private String transactionNum;
	private String transactionContent;
	private String createdAt;
	private String message;
	private int amount;
	private String paymentMethod;

//	public PaymentTransaction(String transactionId, String transactionContent, int amount,
//			String createdAt, String transactionNum) {
//		super();
//		this.transactionId = transactionId;
//		this.transactionNum = transactionNum;
//		this.transactionContent = transactionContent;
//		this.amount = amount;
//		this.createdAt = createdAt;
//	}
//
//	public PaymentTransaction(String errorCode, String transactionId, String transactionContent,
//			int amount, String createdAt, String transactionNum) {
//		super();
//		this.errorCode = errorCode;
//		this.transactionId = transactionId;
//		this.transactionNum = transactionNum;
//		this.transactionContent = transactionContent;
//		this.amount = amount;
//		this.createdAt = createdAt;
//		if ("00".equals(getErrorCode())) {
//			message = "Successful transaction";
//		} else {
//			message = "Transaction failed";
//		}
//	}

	public static PaymentTransaction getPaymentTransactionByOrderId(Long orderId) throws SQLException {
		return null;
	}

}
