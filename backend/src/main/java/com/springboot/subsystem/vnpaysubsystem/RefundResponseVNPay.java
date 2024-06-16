package com.springboot.subsystem.vnpaysubsystem;

import java.util.Map;

import com.springboot.exception.InvalidCheckSumException;
import com.springboot.exception.InvalidIdentifierException;
import com.springboot.exception.InvalidRefundRequestDataException;
import com.springboot.exception.NotFoundTransactionException;
import com.springboot.exception.ProcessingRefundException;
import com.springboot.exception.RejectRefundTransactionException;
import com.springboot.exception.UnrecognizedException;
import com.springboot.model.entity.RefundTransaction;

public class RefundResponseVNPay {
	Map<String, String> response;

	public RefundResponseVNPay(Map<String, String> response) {
		this.response = response;
	}

	public RefundTransaction getRefundTransaction() {
		if (response == null) {
			return null;
		}
		String errorCode = response.get("vnp_ResponseCode");
		switch (errorCode) {
		case "00":
			break;
		case "02":
			throw new InvalidIdentifierException();
		case "03":
			throw new InvalidRefundRequestDataException();
		case "91":
			throw new NotFoundTransactionException();
		case "94":
			throw new ProcessingRefundException();
		case "95":
			throw new RejectRefundTransactionException();
		case "97":
			throw new InvalidCheckSumException();
		default:
			throw new UnrecognizedException();
		}
		String id = response.get("vnp_ResponseId");
		String message = response.get("vnp_Message");
		int amount = Integer.parseInt(response.get("vnp_Amount")) / 100;
		String content = response.get("vnp_OrderInfo");

        return new RefundTransaction(id, message, errorCode, amount, content);
	}

}
