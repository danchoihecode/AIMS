

package views.screen.payment;

import entity.invoice.Invoice;
import entity.payment.PaymentTransaction;
import javafx.fxml.FXML;
import javafx.scene.input.MouseEvent;
import javafx.scene.text.Text;
import javafx.stage.Stage;
import views.screen.BaseScreenHandler;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;

public class FailOrderScreen extends BaseScreenHandler {
    @FXML
    private Text name;
    @FXML private Text phone;
    @FXML private Text province;
    @FXML private Text address;
    @FXML private Text email;
    @FXML private Text deliveryTime;
    @FXML private Text deliveryNote;
    @FXML private Text amount;
    @FXML private Text transactionErrorCode;
    @FXML private Text transactionErrorDetail;


    public FailOrderScreen(Stage stage, String screenPath, Invoice invoice, PaymentTransaction paymentTransaction) throws IOException {
        super(stage, screenPath);
        HashMap<String, String> deliveryInfo = invoice.getOrder().getDeliveryInfo();
        name.setText(deliveryInfo.get("name"));
        phone.setText(deliveryInfo.get("phone"));
        address.setText(deliveryInfo.get("address"));
        email.setText(deliveryInfo.get("email"));
        province.setText(deliveryInfo.get("province"));
        deliveryNote.setText(deliveryInfo.get("instructions"));

        amount.setText(String.valueOf(paymentTransaction.getAmount()));
        transactionErrorCode.setText(paymentTransaction.getErrorCode());
        transactionErrorDetail.setText(paymentTransaction.getMessage());
    }
    @FXML
    void confirmPayment(MouseEvent event) throws IOException {
        homeScreenHandler.show();
    }
}
