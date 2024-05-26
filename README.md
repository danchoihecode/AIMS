# ISD.ICT.20232-08

## Members
- Bui Hoang Ha 20205149
- Do Hong Hai 20215199
- Duong Hoang Hai 20215198 - Leader
- Nguyen Huu Hai 20215200
- Dang Phuc Hieu 20194759

## Work

### First week (20-26/5/2024)
All use cases related to Place order

### Work assignment
- Bui Hoang Ha 20205149: Class design, DB modeling, checks conflicts
- Do Hong Hai 20215199: VNPay Subsystem, makes handlers for Delivery Form, SuccessOrderScreen, and FailureOrderScreen
- Duong Hoang Hai 20215198: Gives skeleton source code, DB modeling, makes handlers for CartScreen and InvoiceScreen
- Nguyen Huu Hai 20215200: GUI design for Cart Screen and Delivery Form
- Dang Phuc Hieu 20194759: GUI design for InvoiceScreen, SuccessOrderScreen, and FailureOrderScreen

## Tech stack
- JavaFX

# Project Setup Instructions

1. Unzip the zip file.

2. Configure Eclipse to use the required VM arguments for JavaFX:
    - Go to `Run Configurations`.
    - Select your Java application.
    - In the `VM arguments` section, checks the following :
      ```
      --module-path lib/win/javafx-sdk-15/lib --add-modules=javafx.swing,javafx.graphics,javafx.fxml,javafx.media,javafx.web
      --add-reads javafx.graphics=ALL-UNNAMED
      --add-opens javafx.controls/com.sun.javafx.charts=ALL-UNNAMED
      --add-opens javafx.graphics/com.sun.javafx.iio=ALL-UNNAMED
      --add-opens javafx.graphics/com.sun.javafx.iio.common=ALL-UNNAMED
      --add-opens javafx.graphics/com.sun.javafx.css=ALL-UNNAMED
      --add-opens javafx.base/com.sun.javafx.runtime=ALL-UNNAMED
      ```

3. Open the file `App.java`.

4. Click `Run` to start the project.

