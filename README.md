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
- Ensure Maven dependencies (in pom.xml) are installed
- Run the AimsApplication class to start the backend application
4. For the frontend project :

### Prerequisites

Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. **Ensure you are in the frontend project's directory:**

    ```bash
    cd Frontend
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

    #### Open [http://localhost:3000](http://localhost:3000) with your browser to see the customer page.
    #### Admin and product manager login page : [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
    #### Sample account (for both admin and manager) : Email : g@gmail.com, Password : 12345678

