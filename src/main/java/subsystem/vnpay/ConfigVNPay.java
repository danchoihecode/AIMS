
package subsystem.vnpay;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 *
 * @author CTT VNPAY
 */
public class ConfigVNPay {
    private static final Map<String, String> transactionStatus = new HashMap<>();

    // Static initialization block to populate the map
    static {
        transactionStatus.put("00", "Giao dịch thành công");
        transactionStatus.put("01", "Giao dịch chưa hoàn tất");
        transactionStatus.put("02", "Giao dịch bị lỗi");
        transactionStatus.put("04", "Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)");
        transactionStatus.put("05", "VNPAY đang xử lý giao dịch này (GD hoàn tiền)");
        transactionStatus.put("06", "VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)");
        transactionStatus.put("07", "Giao dịch bị nghi ngờ gian lận");
        transactionStatus.put("09", "GD Hoàn trả bị từ chối");
    }
    public static String getTransactionStatus(String key) {
        return transactionStatus.get(key);
    }
    public static final String vnp_PayUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    public static final String vnp_ReturnUrl = "http://localhost:8080/payment";
    public static final String vnp_TmnCode = "3EBUDP0P";
    public static final String secretKey = "V4S3JKIW9JF4CEF0L1SRXH2W4SLMK8B6";
    public static final String vnp_ApiUrl = "https://sandbox.vnpayment.vn/merchant_webapi/api/transaction";

    public static final String vnp_Version = "2.1.0";
    public static final String vnp_Command = "pay";
    public static final String vnp_OrderType = "other";
    public static final String vnp_CurrCode = "VND";
    public static final String vnp_Locale = "vn";

    public static String vnp_Command_pay = "pay";
    public static String vnp_Command_refund = "refund";
    public static String website_name = "aims_15";

    private static Map<String, String> getVNPPayFixedParams() {
        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_CurrCode", vnp_CurrCode);
        vnp_Params.put("vnp_OrderType", vnp_OrderType);
        vnp_Params.put("vnp_Locale", vnp_Locale);
        vnp_Params.put("vnp_ReturnUrl", vnp_ReturnUrl);
        try {
            vnp_Params.put("vnp_IpAddr", InetAddress.getLocalHost().getHostAddress());
        } catch (UnknownHostException e) {
            vnp_Params.put("vnp_IpAddr", "127.0.0.1");
        }
        Calendar cld = Calendar.getInstance();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        return vnp_Params;
    }
    public static Map<String, String> getVNPPayParams(long amount, String TxnRef, String command) {
        Map<String, String> vnp_Params = getVNPPayFixedParams();
        vnp_Params.put("vnp_Amount", String.valueOf(amount * 100));
        vnp_Params.put("vnp_TxnRef", TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + TxnRef);
        vnp_Params.put("vnp_Command", command);
        return vnp_Params;
    }

    public static String getVNPayUrl(Map<String, String> fields) {
        List<String> fieldNames = new ArrayList<>(fields.keySet());
        Collections.sort(fieldNames);
        StringBuilder query = new StringBuilder();
        StringBuilder hashData = new StringBuilder();
        for (String fieldName : fieldNames) {
            String fieldValue = fields.get(fieldName);
            if ((fieldValue != null) && (!fieldValue.isEmpty())) {
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append("=");
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

                hashData.append(fieldName);
                hashData.append("=");
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                if (fieldNames.indexOf(fieldName) < fieldNames.size() - 1) {
                    query.append("&");
                    hashData.append("&");
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = hmacSHA512(secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;

        return vnp_PayUrl + "?" + queryUrl;
    }
    public static String md5(String message) {
        String digest = null;
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hash = md.digest(message.getBytes("UTF-8"));
            StringBuilder sb = new StringBuilder(2 * hash.length);
            for (byte b : hash) {
                sb.append(String.format("%02x", b & 0xff));
            }
            digest = sb.toString();
        } catch (UnsupportedEncodingException ex) {
            digest = "";
        } catch (NoSuchAlgorithmException ex) {
            digest = "";
        }
        return digest;
    }

    public static String Sha256(String message) {
        String digest = null;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(message.getBytes("UTF-8"));
            StringBuilder sb = new StringBuilder(2 * hash.length);
            for (byte b : hash) {
                sb.append(String.format("%02x", b & 0xff));
            }
            digest = sb.toString();
        } catch (UnsupportedEncodingException ex) {
            digest = "";
        } catch (NoSuchAlgorithmException ex) {
            digest = "";
        }
        return digest;
    }

    public static String hashAllFields(Map fields) {
        List fieldNames = new ArrayList(fields.keySet());
        Collections.sort(fieldNames);
        StringBuilder sb = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) fields.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                sb.append(fieldName);
                sb.append("=");
                sb.append(fieldValue);
            }
            if (itr.hasNext()) {
                sb.append("&");
            }
        }
        return hmacSHA512(secretKey,sb.toString());
    }
    
    public static String hmacSHA512(final String key, final String data) {
        try {

            if (key == null || data == null) {
                throw new NullPointerException();
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {
            return "";
        }
    }
    
    public static String getIpAddress() {
        return "192.168.56.1";
    }
    public static boolean isVNPayReturnURL(String url) {
        return url.startsWith(vnp_ReturnUrl);
    }

    public static String getRandomNumber(int len) {
        Random rnd = new Random();
        String chars = "0123456789";
        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(chars.charAt(rnd.nextInt(chars.length())));
        }
        return sb.toString();
    }
}
