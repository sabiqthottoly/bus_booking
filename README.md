# Bus Ticket Management System

Welcome to the Bus Ticket Management System GitHub repository! This system is tailored for bus companies to efficiently manage and track ticket information. Below, you'll find instructions on setting up and using the system with changes specific to a bus company.


## Introduction

The Bus Ticket Management System is a comprehensive solution designed specifically for bus companies. It facilitates the management of bus tickets by providing RESTful APIs for updating ticket status, viewing ticket details, and additional functionalities.

## Setup

1. Clone the repository:
  ```git clone https://github.com/sabiqthottoly/bus_booking.git```
2. Navigate to the project directory:
  ```cd bus_booking```
3. Install dependencies:
  ```npm install```

## Usage
1. Start the Node.js server:
    ```npm start```

Access the API at http://localhost:3000/api

Explore the API endpoints using tools like Postman.

## API Endpoints

1. Admin Endpoints:
  * POST /api/tickets
  * PUT  /api/tickets/:ticketId
  * POST /api/tickets/closed
  * POST /api/tickets/open
  * POST /api/tickets/details/:ticketId
  * POST /api/admin/reset

  


