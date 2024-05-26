package subsystem.vnpay;

import com.google.gson.Gson;
import entity.payment.PaymentTransaction;
import entity.payment.RefundTransaction;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

public class VNPayBoundary {

	public String generateURL(int amount, String content) throws IOException {
		Map<String, String> vnp_Params = ConfigVNPay.getVNPPayParams(amount, content, "pay");
		return ConfigVNPay.getVNPayUrl(vnp_Params);
	}

	public RefundTransaction refund(PaymentTransaction paymentTransaction) throws IOException {
		RefundRequestVNPay refundRequestVNPay = new RefundRequestVNPay( paymentTransaction);
		String response = refundRequestVNPay.refund();
		Gson gson = new Gson();
		Type type = new com.google.gson.reflect.TypeToken<HashMap<String, String>>() {}.getType();
		HashMap<String, String> resultHashmap = gson.fromJson(response, type);
		RefundResponseVNPay refundResponseVNPay = new RefundResponseVNPay(resultHashmap);
		return refundResponseVNPay.getRefundTransaction();
	}

	public PaymentTransaction getPaymentTransaction(Map<String,String> response) {
		PayResponseVNPay payResponseVNPay = new PayResponseVNPay(response);
		return payResponseVNPay.getPaymentTransaction();
	}

}
