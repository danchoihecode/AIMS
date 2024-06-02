# ISD.ICT.20232-08

# Members
- Bui Hoang Ha 20205149
- Do Hong Hai 20215199
- Duong Hoang Hai 20215198 - Leader
- Nguyen Huu Hai 20215200
- Dang Phuc Hieu 20194759

# Work

## First week (20-26/5/2024)
All use cases related to Place order

## Work done in week 1
- Bui Hoang Ha 20205149:
  + Class design
  + DB modeling
  + Checks conflicts
- Do Hong Hai 20215199:
  + VNPay Subsystem
  + Makes handlers for Delivery Form, SuccessOrderScreen and FailureOrderScreen
  + GUI design for FailureOrderScreen
- Duong Hoang Hai 20215198:
  + Gives skeleton source code for the project
  + DB modeling
  + Makes handlers for CartScreen and InvoiceScreen
- Nguyen Huu Hai 20215200: GUI design for Cart Screen and Delivery Form
- Dang Phuc Hieu 20194759: GUI design for InvoiceScreen and SuccessOrderScreen

## Second week (27/5-2/6/2024)
All use cases related to Place order

## Work done in week 2
### Convert from desktop app to web app
#### Frontend
- Do Hong Hai 20215199: Programming the user-side web interface
- Nguyen Huu Hai 20215200: Programming the user-side web interface
#### Backend
- Bui Hoang Ha 20205149: Handles API calls from the frontend in PlaceOrderController
- Duong Hoang Hai 20215198:
  + Create skeleton source code for project (model, service, repository, exception, controller)
  + Handles API calls from the frontend in ViewCartController, PaymentController
  + VNPay subsystem (backend)
- Dang Phuc Hieu 20194759: Did not participate
### Review code
- Bui Hoang Ha 20205149: DIP: The Dependency Inversion Principle
- Do Hong Hai 20215199: LSP: The Liskov Substitution Principle
- Duong Hoang Hai 20215198: SRP: The Single Responsibility Principle
- Nguyen Huu Hai 20215200: OCP: The Open Closed Principle
- Dang Phuc Hieu 20194759: ISP: The Interface Segregation Principle
# Tech stack
- Frontend : HTML, CSS, Javascript, Next.js Framework.
- Backend :  Spring Boot, Java, MySQL

# Project Setup Instructions
1. Download XAMPP https://www.apachefriends.org/download.html
2. Download the project from branch main and upzip the zip file
3. For the backend project (AIMS) :
- Run Xampp, on the Apache line, go to the config file httpd.conf and change the port to 88
- Go to PHPMyAdmin: http://localhost:88/phpmyadmin/
- Create a new database named 'aims'
- Copy the command in the aims.sql file and run to create the database
- Run the AimsApplication class to start the backend application
4. For the frontend project :
   
