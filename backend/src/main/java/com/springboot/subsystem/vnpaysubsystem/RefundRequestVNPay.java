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
import com.springboot.Utils;
import com.springboot.model.entity.Order;
import com.springboot.model.entity.PaymentTransaction;

public class RefundRequestVNPay {
    PaymentTransaction paymentTransaction;


    public RefundRequestVNPay(PaymentTransaction paymentTransaction) {
        this.paymentTransaction = paymentTransaction;
    }
    public String refund() throws IOException {
        String vnp_RequestId = ConfigVNPay.getRandomNumber(8);
        String vnp_Version = "2.1.0";
        String vnp_Command = "querydr";
        String vnp_TmnCode = ConfigVNPay.vnp_TmnCode;
        String vnp_TransactionType = ConfigVNPay.vnp_TransactionType;
        String vnp_TxnRef = String.valueOf("79453960"); // TODO: get from the transaction
        long amount = 46200000;//paymentTransaction.getAmount() * 100L;
        String vnp_Amount = String.valueOf(amount);
        String vnp_OrderInfo = "Hoan tien GD OrderId:" + vnp_TxnRef;
        String vnp_TransactionNo = "14461951"; //Assuming value of the parameter "vnp_TransactionNo" does not exist on your system.
        String vnp_TransactionDate = "20240616194743";
        String vnp_CreateBy = "hai dh";

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());

        String vnp_IpAddr = ConfigVNPay.getIpAddress();

        JsonObject  vnp_Params = new JsonObject();

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

        URL url = new URL (ConfigVNPay.vnp_ApiUrl);
        System.out.println("URL: " + url);
        HttpURLConnection con = (HttpURLConnection)url.openConnection();
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
//        long amountVNPay = paymentTransaction.getAmount() * 100L;
//
//        String vnp_TxnRef = paymentTransaction.getTransactionNum();
//        String vnp_RequestId = ConfigVNPay.getRandomNumber(8);
//        String vnp_IpAddr = ConfigVNPay.getIpAddress();
//
//        String vnp_TmnCode = ConfigVNPay.vnp_TmnCode;
//        String orderInfo = "Refund";
//
//        Map<String, String> vnp_Params = new HashMap<>();
//        vnp_Params.put("vnp_Version", vnp_Version);
//        vnp_Params.put("vnp_Command", ConfigVNPay.vnp_Command_refund);
//        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
//        vnp_Params.put("vnp_Amount", String.valueOf(amountVNPay));
//        vnp_Params.put("vnp_OrderInfo", orderInfo);
//        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
//        vnp_Params.put("vnp_TransactionType", "02");
//        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
//        vnp_Params.put("vnp_CreateBy", ConfigVNPay.website_name);
//        vnp_Params.put("vnp_RequestId", vnp_RequestId);
//
//        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
//        String vnp_TransactionDate = Utils.convertDateFormat(paymentTransaction.getCreatedAt());
//        vnp_Params.put("vnp_TransactionDate", vnp_TransactionDate);
//        String vnp_CreateDate = formatter.format(cld.getTime());
//        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
//
//        String hash_Data= String.join("|", vnp_RequestId, vnp_Version, ConfigVNPay.vnp_Command_refund, vnp_TmnCode,
//                "02", vnp_TxnRef, String.valueOf(amountVNPay), "", vnp_TransactionDate,
//                ConfigVNPay.website_name, vnp_CreateDate, vnp_IpAddr, orderInfo);
//
//        String vnp_SecureHash = ConfigVNPay.hmacSHA512(ConfigVNPay.secretKey, hash_Data.toString());
//
//        vnp_Params.put("vnp_SecureHash", vnp_SecureHash);
//
//        URL url = new URL(ConfigVNPay.vnp_ApiUrl);
//        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//
//        connection.setRequestMethod("POST");
//        connection.setRequestProperty("Content-Type", "application/json");
//        connection.setDoOutput(true);
//        DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
//        Gson gson = new Gson();
//        Type typeObject = new TypeToken<HashMap>() {}.getType();
//        String gsonData = gson.toJson(vnp_Params, typeObject);
//        wr.writeBytes(gsonData);
//        wr.flush();
//        wr.close();
//        int responseCode = connection.getResponseCode();
//        System.out.println("Sending 'POST' request to URL : " + url);
//        System.out.println("Post Data : " + vnp_Params);
//        System.out.println("Response Code : " + responseCode);
//        BufferedReader in = new BufferedReader(
//                new InputStreamReader(connection.getInputStream()));
//        String output;
//        StringBuffer response = new StringBuffer();
//        while ((output = in.readLine()) != null) {
//            response.append(output);
//        }
//        in.close();
//        System.out.println(response.toString());
//        return response.toString();
    }
    public void sendRefund() throws IOException {
        //Command: refund
        String vnp_RequestId = ConfigVNPay.getRandomNumber(8);
        String vnp_Version = "2.1.0";
        String vnp_Command = "refund";
        String vnp_TmnCode = ConfigVNPay.vnp_TmnCode;
        String vnp_TransactionType = ConfigVNPay.vnp_TransactionType;
        String vnp_TxnRef = String.valueOf("18340984"); // TODO: get from the transaction
        long amount = 67150000;//paymentTransaction.getAmount() * 100L;
        String vnp_Amount = String.valueOf(amount);
        String vnp_OrderInfo = "Hoan tien GD OrderId:" + vnp_TxnRef;
        String vnp_TransactionNo = "18340984"; //Assuming value of the parameter "vnp_TransactionNo" does not exist on your system.
        String vnp_TransactionDate = "20240616190205";
        String vnp_CreateBy = "Hai DH";

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());

        String vnp_IpAddr = ConfigVNPay.getIpAddress();

        JsonObject  vnp_Params = new JsonObject();

        vnp_Params.addProperty("vnp_RequestId", vnp_RequestId);
        vnp_Params.addProperty("vnp_Version", vnp_Version);
        vnp_Params.addProperty("vnp_Command", vnp_Command);
        vnp_Params.addProperty("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.addProperty("vnp_TransactionType", vnp_TransactionType);
        vnp_Params.addProperty("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.addProperty("vnp_Amount", vnp_Amount);
        vnp_Params.addProperty("vnp_OrderInfo", vnp_OrderInfo);
        vnp_Params.addProperty("vnp_TransactionDate", vnp_TransactionDate);
        vnp_Params.addProperty("vnp_CreateBy", vnp_CreateBy);
        vnp_Params.addProperty("vnp_CreateDate", vnp_CreateDate);
        vnp_Params.addProperty("vnp_IpAddr", vnp_IpAddr);

        String hash_Data= String.join("|", vnp_RequestId, vnp_Version, vnp_Command, vnp_TmnCode,
                vnp_TransactionType, vnp_TxnRef, vnp_Amount, vnp_TransactionNo, vnp_TransactionDate,
                vnp_CreateBy, vnp_CreateDate, vnp_IpAddr, vnp_OrderInfo);

        String vnp_SecureHash = ConfigVNPay.hmacSHA512(ConfigVNPay.secretKey, hash_Data);

        vnp_Params.addProperty("vnp_SecureHash", vnp_SecureHash);

        URL url = new URL (ConfigVNPay.vnp_ApiUrl);
        System.out.println("URL: " + url);
        HttpURLConnection con = (HttpURLConnection)url.openConnection();
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
    }
}
