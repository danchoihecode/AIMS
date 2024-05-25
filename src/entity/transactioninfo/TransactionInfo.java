package entity.transactioninfo;

import java.time.LocalDateTime;

public class TransactionInfo {

	private int id;

	private double amount;

	private String bankCode;

	private String bankTranNo;

	private String cardType;

	private LocalDateTime payDate;

	private String content;

	private String transactionNo;

	public TransactionInfo() {

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getBankCode() {
		return bankCode;
	}

	public void setBankCode(String bankCode) {
		this.bankCode = bankCode;
	}

	public String getBankTranNo() {
		return bankTranNo;
	}

	public void setBankTranNo(String bankTranNo) {
		this.bankTranNo = bankTranNo;
	}

	public String getCardType() {
		return cardType;
	}

	public void setCardType(String cardType) {
		this.cardType = cardType;
	}

	public LocalDateTime getPayDate() {
		return payDate;
	}

	public void setPayDate(LocalDateTime payDate) {
		this.payDate = payDate;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getTransactionNo() {
		return transactionNo;
	}

	public void setTransactionNo(String transactionNo) {
		this.transactionNo = transactionNo;
	}
	
	

}
