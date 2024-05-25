package entity.invoice;

import entity.order.Order;
import entity.transactioninfo.TransactionInfo;

public class Invoice {

	private int id;
	
	private String currency;

	private double amount;

	private Order order;

	private TransactionInfo trans;

	public Invoice(Order order) {

	}
	
	public void saveTransactionInfo(TransactionInfo tran) {

	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public TransactionInfo getTrans() {
		return trans;
	}

	public void setTrans(TransactionInfo trans) {
		this.trans = trans;
	}
	
	

}
