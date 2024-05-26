# ISD.ICT.20232-08
Members :
Bui Hoang Ha 20205149
Do Hong Hai 20215199
Duong Hoang Hai 20215198 - Leader
Nguyen Huu Hai 20215200
Dang Phuc Hieu 20194759
# Work
First week (20-26/5/2024) : all usecases related to Place order
Work assignment :
Bui Hoang Ha 20205149 : Class design, DB modeling, checks conflicts
Do Hong Hai 20215199 : VNPay Subsystem, makes handlers for Delivery Form, SuccessOrderScreen and FailureOrderScreen
Duong Hoang Hai 20215198 : gives skeleton source code, DB modeling, makes handlers for CartScreen and InvoiceScreen
Nguyen Huu Hai 20215200 : GUI design for Cart Screen and Delivery Form
Dang Phuc Hieu 20194759 : GUI design for InvoiceScreen, SuccessOrderScreen and FailureOrderScreen
# Teck stack
JavaFX
# Setup
- Unzip the zip file
- Go to Run Configurations (Eclipse) and check the VM arguments :
--module-path lib/win/javafx-sdk-15/lib --add-modules=javafx.swing,javafx.graphics,javafx.fxml,javafx.media,javafx.web
--add-reads javafx.graphics=ALL-UNNAMED
--add-opens javafx.controls/com.sun.javafx.charts=ALL-UNNAMED
--add-opens javafx.graphics/com.sun.javafx.iio=ALL-UNNAMED
--add-opens javafx.graphics/com.sun.javafx.iio.common=ALL-UNNAMED
--add-opens javafx.graphics/com.sun.javafx.css=ALL-UNNAMED
--add-opens javafx.base/com.sun.javafx.runtime=ALL-UNNAMED
- Open file App.java and click Run to start the project
