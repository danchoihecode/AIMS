package views.screen.invoice;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import common.exception.ProcessInvoiceException;
import controller.PaymentController;
import entity.invoice.Invoice;
import entity.order.Order;
import entity.order.OrderMedia;
import entity.payment.PaymentTransaction;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.VBox;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.stage.Modality;
import javafx.stage.Stage;
import subsystem.vnpay.ConfigVNPay;
import utils.Configs;
import utils.Utils;
import views.screen.BaseScreenHandler;
import views.screen.payment.PaymentScreenHandler;
import views.screen.payment.ResultScreenHandler;

public class InvoiceScreenHandler extends BaseScreenHandler {

	private static Logger LOGGER = Utils.getLogger(InvoiceScreenHandler.class.getName());

	@FXML
	private Label pageTitle;

	@FXML
	private Label name;

	@FXML
	private Label phone;

	@FXML
	private Label province;

	@FXML
	private Label address;

	@FXML
	private Label instructions;

	@FXML
	private Label subtotal;

	@FXML
	private Label shippingFees;

	@FXML
	private Label labelTime;

	@FXML
	private Label labelRushShippingInstr;

	@FXML
	private Label time;

	@FXML
	private Label rushInstruction;

	@FXML
	private Label total;

	@FXML
	private Label email;

	@FXML
	private VBox vboxItems;

	private Invoice invoice;

	public InvoiceScreenHandler(Stage stage, String screenPath, Invoice invoice) throws IOException {
		super(stage, screenPath);
		this.invoice = invoice;
		setInvoiceInfo();
	}

	private void setInvoiceInfo(){
		HashMap<String, String> deliveryInfo = invoice.getOrder().getDeliveryInfo();
		name.setText(deliveryInfo.get("name"));
		province.setText(deliveryInfo.get("province"));
		instructions.setText(deliveryInfo.get("instructions"));
		address.setText(deliveryInfo.get("address"));
		email.setText(deliveryInfo.get("email"));

		if(deliveryInfo.get("isRushShipping").equals("Yes")){
			labelTime.setVisible(true);
			labelRushShippingInstr.setVisible(true);
			time.setVisible(true);
			rushInstruction.setVisible(true);
			time.setText(deliveryInfo.get("time"));
			rushInstruction.setText(deliveryInfo.get("rushShippingInstruction"));
		}
		else{
			labelTime.setVisible(false);
			labelRushShippingInstr.setVisible(false);
			time.setVisible(false);
			rushInstruction.setVisible(false);
		}

		subtotal.setText(Utils.getCurrencyFormat(invoice.getOrder().calculateTotalProductIncludeVAT()));
		shippingFees.setText(Utils.getCurrencyFormat(invoice.getOrder().calculateShippingFees()));
		total.setText(Utils.getCurrencyFormat(invoice.getOrder().calculateTotalPrice()));
		invoice.getOrder().getlstOrderMedia().forEach(orderMedia -> {
			try {
				MediaInvoiceScreenHandler mis = new MediaInvoiceScreenHandler(Configs.INVOICE_MEDIA_SCREEN_PATH);
				mis.setOrderMedia((OrderMedia) orderMedia);
				vboxItems.getChildren().add(mis.getContent());
			} catch (IOException | SQLException e) {
				System.err.println("errors: " + e.getMessage());
				throw new ProcessInvoiceException(e.getMessage());
			}
			
		});

	}

	@FXML
	void confirmInvoice(MouseEvent event) throws IOException {

		Stage webViewStage = new Stage();
		webViewStage.setTitle("Payment Process");
		webViewStage.initModality(Modality.APPLICATION_MODAL);

		// Create a WebView and get its WebEngine
		WebView webView = new WebView();
		WebEngine webEngine = webView.getEngine();
		this.setBController(new PaymentController());
		String paymentURL = ((PaymentController) getBController()).generateURL(invoice.getOrder().calculateTotalPrice(), "Payment");
		webEngine.load(paymentURL);

		webEngine.locationProperty().addListener((observable, oldValue, newValue) -> {
			if (newValue.contains(ConfigVNPay.vnp_ReturnUrl)) {
				Map<String, String> queryParams = extractAndPrintQueryParameters(newValue);
				String transactionStatus = Utils.extractQueryParameter(newValue, "vnp_TransactionStatus");
				webViewStage.close();
				try {
					URI uri = new URI(newValue);
					String query = uri.getQuery();
					Map<String, String> params = Utils.parseQueryString(query);
					PaymentController controller = (PaymentController) getBController();
					int orderId = controller.createOrder(invoice.getOrder());
					if (orderId != -1) {
						params.put("orderId", String.valueOf(orderId));
						PaymentTransaction transaction = controller.makePayment(params);
						showResult(transaction);
					}


				} catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
			}

		});
		webViewStage.setOnCloseRequest(eventClose -> {
			if (!webEngine.getLocation().contains(ConfigVNPay.vnp_ReturnUrl)) {
				PaymentTransaction paymentTransaction = new PaymentTransaction(invoice.getOrder().getId(), "01", "TRAN001", "Thanh toan don hang: " + invoice.getOrder().getId(), invoice.getOrder().calculateTotalPrice(), String.valueOf(new Date()), "0001");
				try {
					showResult(paymentTransaction);
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
			}
		});
		VBox webViewLayout = new VBox();
		webViewLayout.getChildren().add(webView);
		Scene webViewScene = new Scene(webViewLayout, 800, 600);

		// Set up the WebView stage
		webViewStage.setTitle("WebView");
		webViewStage.setScene(webViewScene);
		webViewStage.show();
//		BaseScreenHandler paymentScreen = new PaymentScreenHandler(this.stage, Configs.PAYMENT_SCREEN_PATH, invoice.getOrder());
//		paymentScreen.setBController(new PaymentController());
//		paymentScreen.setPreviousScreen(this);
//		paymentScreen.setHomeScreenHandler(homeScreenHandler);
//		paymentScreen.setScreenTitle("Payment Screen");
//		paymentScreen.show();
//		LOGGER.info("Confirmed invoice");
	}
	void showResult(PaymentTransaction paymentTransaction) throws IOException {
		PaymentController controller = (PaymentController) getBController();
		BaseScreenHandler resultScreen = new ResultScreenHandler(this.stage, Configs.RESULT_SCREEN_PATH, paymentTransaction);
		controller.emptyCart();
		resultScreen.setPreviousScreen(this);
		resultScreen.setHomeScreenHandler(homeScreenHandler);
		resultScreen.setScreenTitle("Result Screen");
		resultScreen.show();

	}
	private Map<String, String> extractAndPrintQueryParameters(String url) {
		try {
			URI uri = new URI(url);
			String query = uri.getQuery();
			Map<String, String> queryParams = new HashMap<>();
			String[] pairs = query.split("&");
			for (String pair : pairs) {
				int idx = pair.indexOf("=");
				String key = idx > 0 ? pair.substring(0, idx) : pair;
				String value = idx > 0 && pair.length() > idx + 1 ? pair.substring(idx + 1) : null;
				queryParams.put(key, value);
			}
			return queryParams;
		} catch (URISyntaxException e) {
			System.out.println("Error: " + e.getMessage());
		}
		return new HashMap<>();
	}

}
