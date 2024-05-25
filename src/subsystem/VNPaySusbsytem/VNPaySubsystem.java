package subsystem.VNPaySusbsytem;

import controller.Client;
import subsystem.IPayment;

public class VNPaySubsystem implements IPayment {

	private PayOrderManager manager = new PayOrderManager();

	/**
	 * @see IPayment#payOrder(double, String, Client)
	 * 
	 */
	public void payOrder(double amount, String orderInfo, Client client) {

		manager.payOrder(amount, orderInfo, client);
	}

}
