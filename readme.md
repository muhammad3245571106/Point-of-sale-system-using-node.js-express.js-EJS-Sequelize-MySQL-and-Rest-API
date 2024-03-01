# Point of sale system using node.js, express.js, EJS, Sequelize, MySQL, and Rest-API

## Overview
The Point of Sale (POS) System is a comprehensive software solution designed to streamline and manage the sales process for businesses of all sizes. This system allows for efficient sales transactions, inventory management, and customer engagement.

## Database Schema
The system utilizes the following tables:

1. Discount: Manage store-wide or item-specific discounts.
2. Customer: Store customer details and purchase history.
3. DiscountItems: Keep track of which items are associated with specific discounts.
4. Order: Record each order transaction, including date and associated customer.
5. OrderItems: Store the items and quantities associated with each order.
6. Product: Maintain product information, such as name, price, and stock level.
7. Payment: Track payment information for each order, including payment method and amount.
8. Category: Organize products into main categories for easier management.
9. Subcategory: Further classify products within categories for more granular organization.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and install the required dependencies with `npm install`.
3. Set up your database by running the provided SQL script to create the necessary tables.
4. Update the database connection details in the config file with your own credentials.
5. Run the server using `npm start`. The application will be accessible at http://localhost:PORT, where PORT is the port number specified in your configuration.

Enjoy your new Point of Sale (POS) System!

# Packages

npm i express nodemon
npm i mysql
npm i util 
npm i sequelize
npm i mysql2
