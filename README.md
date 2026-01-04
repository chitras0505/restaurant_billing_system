**🍽 Restaurant Ordering System**
**Overview**
This is a simple web-based restaurant ordering system built using Python Flask and SQLite.
It allows customers to select menu items, add them to a cart, generate bills, and lets the admin view all past orders.


**Features**

-- Login page for simple authentication (email & password).
-- View restaurant menu with items like Burger, Pizza, Juice, Sandwich, Fries, and Ice Cream.
-- Increase or decrease quantity of each item in the cart.
-- Calculate total amount for selected items.
-- Generate a bill/receipt with invoice number and date-time.
-- Admin can view all past orders with item details and total.


**Tech Stack**

Backend: Python, Flask
Database: SQLite
Frontend: HTML, CSS, JavaScript
Libraries: Flask-SQLAlchemy for database handling

**How It Works**

**Login Page:** Enter email and password to access the menu.
**Menu Page:**
1.Select quantity for each food item.
2.Cart updates automatically with item details and total.
3.Generate Bill: Click “Generate Bill” to create a receipt and save the order in the database.
4.View Orders: Go to "View Orders" to see all previous orders with items, total, and time.

**How to Run**
1)Install dependencies:
     pip install flask flask_sqlalchemy

2)Run the app:
     python app.py
