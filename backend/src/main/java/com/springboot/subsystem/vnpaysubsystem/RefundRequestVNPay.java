package com.springboot.subsystem.vnpaysubsystem;

import static com.springboot.subsystem.vnpaysubsystem.ConfigVNPay.vnp_Version;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.springboot.common.Utils;
import com.springboot.model.entity.Order;
import com.springboot.model.entity.PaymentTransaction;

public class RefundRequestVNPay {
    PaymentTransaction paymentTransaction;


    public RefundRequestVNPay(PaymentTransaction paymentTransaction) {
        this.paymentTransaction = paymentTransaction;
    }
    private JsonObject requestBodyBuilder() {
        JsonObject vnp_Params = new JsonObject();
        String vnp_RequestId = ConfigVNPay.getRandomNumber(8);
        String vnp_Version = ConfigVNPay.vnp_Version;
        String vnp_Command = ConfigVNPay.vnp_Command_refund;
        String vnp_TmnCode = ConfigVNPay.vnp_TmnCode;
        String vnp_TransactionType = ConfigVNPay.vnp_TransactionType;
        String vnp_TxnRef = paymentTransaction.getTransactionNum();
        long amount = paymentTransaction.getAmount() * 100L;
        String vnp_Amount = String.valueOf(amount);
        String vnp_OrderInfo = "Refund OrderId: " + vnp_TxnRef;
        String vnp_TransactionNo = paymentTransaction.getTransactionId();
        String vnp_TransactionDate = Utils.convertDateFormat(paymentTransaction.getCreatedAt());
        String vnp_CreateBy = ConfigVNPay.website_name;
        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        String vnp_IpAddr = ConfigVNPay.getIpAddress();

        vnp_Params.addProperty("vnp_RequestId", vnp_RequestId);
        vnp_Params.addProperty("vnp_Version", vnp_Version);
        vnp_Params.addProperty("vnp_Command", vnp_Command);
        vnp_Params.addProperty("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.addProperty("vnp_TransactionType", vnp_TransactionType);
        vnp_Params.addProperty("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.addProperty("vnp_Amount", vnp_Amount);
        vnp_Params.addProperty("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.addProperty("vnp_TransactionNo", vnp_TransactionNo);
        vnp_Params.addProperty("vnp_TransactionDate", vnp_TransactionDate);
        vnp_Params.addProperty("vnp_CreateBy", vnp_CreateBy);
        vnp_Params.addProperty("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.addProperty("vnp_IpAddr", vnp_IpAddr);

        String hash_Data= String.join("|", vnp_RequestId, vnp_Version, vnp_Command, vnp_TmnCode,
                vnp_TransactionType, vnp_TxnRef, vnp_Amount, vnp_TransactionNo, vnp_TransactionDate,
                vnp_CreateBy, vnp_CreateDate, vnp_IpAddr, vnp_OrderInfo);

        String vnp_SecureHash = ConfigVNPay.hmacSHA512(ConfigVNPay.secretKey, hash_Data);

        vnp_Params.addProperty("vnp_SecureHash", vnp_SecureHash);
        return vnp_Params;
    }
    public String refund() throws IOException {
        JsonObject vnp_Params = requestBodyBuilder();
        URL url = new URL(ConfigVNPay.vnp_ApiUrl);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(vnp_Params.toString());
        wr.flush();
        wr.close();
        int responseCode = con.getResponseCode();
        System.out.println("nSending 'POST' request to URL : " + url);
        System.out.println("Post Data : " + vnp_Params);
        System.out.println("Response Code : " + responseCode);
        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String output;
        StringBuffer response = new StringBuffer();
        while ((output = in.readLine()) != null) {
            response.append(output);
        }
        in.close();
        System.out.println(response);
        return "";
    }
}
