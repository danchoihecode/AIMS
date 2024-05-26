package subsystem.vnpay;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

public class PayRequestVNPay {
    private int amount;
    private String content;

    public PayRequestVNPay(int amount, String content){
        this.amount = amount;
        this.content = content;
    }

    public String generateURL() throws UnsupportedEncodingException {
        Map<String, String> vnp_Params = ConfigVNPay.getVNPPayParams(amount, content, "pay");
        return ConfigVNPay.getVNPayUrl(vnp_Params);
    }
}
