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

## 3/6-18/6/2024
Complete the entire AIMS project
## Use cases
- Bui Hoang Ha 20205149: CRUD user, Manage user role, Block/unblock user, Change password (Frontend)
- Do Hong Hai 20215199: View cart, Update cart, Place order (includes Place rush order and Pay order), View order information, Cancel order
- Duong Hoang Hai 20215198: View list of orders, Approve order, Reject order, Login (Backend), Change password (Backend)
- Nguyen Huu Hai 20215200: View List of product in homepage, Search Product, View product detail information, Add product to cart
- Dang Phuc Hieu 20194759: CRUD Product, Update product price (Not finish), Login (Frontend)
## Making SDD
- Bui Hoang Ha 20205149: Screen Transition Diagrams (4.1.2), Data Modeling (4.2), Non-Database Management System Files (4.3)
- Do Hong Hai 20215199: Design Considerations (5)
- Duong Hoang Hai 20215198: Screen Configuration Standardization (4.1.1), General Class Diagram (4.4.1), Class Diagrams (4.4.2)
- Nguyen Huu Hai 20215200: Introduction (1), Overall Description (2), Architectural Patterns (3.1), Security Software Architecture (3.5)
- Dang Phuc Hieu 20194759: Did not participate (only did individual part)
# Tech stack
- Frontend : HTML, CSS, Javascript, React.js, TypeScript, Next.js Framework.
- Backend :  Spring Boot and JWT authentication, Java, MySQL

# Project Setup Instructions
1. Download XAMPP https://www.apachefriends.org/download.html
2. Download the project from branch main and upzip the zip file
3. For the backend project :
- Run Xampp (Apache + MySQL), on the Apache line, go to the config file httpd.conf and change the port to 88
- Go to PHPMyAdmin: http://localhost:88/phpmyadmin/
- Create a new database named 'aims'
- Copy the command in the aims.sql file and run to create the database
- Run the AimsApplication class to start the backend application
4. For the frontend project :

### Prerequisites

Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-nextjs-project.git
    cd your-nextjs-project
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

### Running the Development Server

3. **Start the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
