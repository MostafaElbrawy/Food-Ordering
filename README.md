# Food Delivery System — Project Documentation

## **1. Overview**

The Food Delivery System is a web-based application that allows customers to order food online, track their orders, and receive deliveries through a network of delivery personnel.

The system provides separate interfaces for **Admin**, **Customers**, and **Delivery Men**, each with specific features based on their assigned roles.

---

## **2. System Users & Roles**

### **2.1 Customer**

- Sign up and log in using email and password
- Browse categorized food products
- Add products to the shopping cart
- Place an order
- Track order status in real-time
- View order history and ratings

### **2.2 Admin**

- Access a centralized dashboard
- Monitor all orders and delivery statuses
- View ratings and generate reports
- Manage products and categories
- Manage users (customers, delivery men)
- Assign roles and permissions
- Oversee delivery operations

### **2.3 Delivery Man**

- Log in and access delivery tasks
- Update availability status (Ready / Busy)
- Receive automatically assigned orders
- View delivery details and customer location
- Mark delivery as completed
- Track their earnings from delivery fees
- Store personal information (license, vehicle type, etc.)

---

## **3. Core Features**

### **3.1 Authentication & Authorization**

- User registration (customers)
- User login
- Role-based access control
- Pages and features are shown based on user role

---

### **3.2 Product Management**

- All products (food items) are organized into categories
- Admin can add, edit, delete products
- Customers can filter or browse by category

---

### **3.3 Shopping Cart**

- Customers can add/remove items
- Update item quantities
- Checkout and place orders

---

### **3.4 Orders**

- Order is created when customer checks out
- Admin dashboard receives all new orders
- Order is automatically assigned to an available delivery man
- Delivery man handles and delivers the order
- Customer can track progress:
    - Pending
    - Preparing
    - Out for Delivery
    - Delivered
- Delivery man marks the delivery as complete

---

### **3.5 Delivery Management**

- Delivery man sets status:
    - **Available** → ready to take new orders
    - **Busy** → currently delivering
- System auto-assigns new orders to available delivery men
- Delivery fee is added to delivery man's earnings

---

### **3.6 Ratings & Reports**

- Customers can rate orders
- Admin can view rating trends
- Admin dashboard contains analytics and reports (orders per day, deliveries, revenue, etc.)

---

## **4. Data Storage**

The system stores:

### **User Info**

- id
- first name
- last name
- email
- password
- phone
- gender
- created_at
- Role (Admin / Customer / Delivery Man)

### Delivery Man

- license_plate
- license_number
- vehicle_type
- status (ready/busy)

### Admins

- date_employed

### **Products**

- id
- name
- description
- price
- category
- Image

### **Orders**

- Customer ID
- Products & quantities
- Total price
- delivery fees
- sub total
- Order status
- location
- Assigned delivery man
- date_placed
- date_arrived
- rating

---

## **5. Workflow**

1. **Customer signs up → logs in → browses products**
2. Adds items to cart → places an order
3. Order sent to **Admin Dashboard**
4. System looks for **available** delivery man
5. Order automatically assigned
6. Delivery man sees order → accepts → delivers
7. Customer tracks status
8. Delivery man marks as completed
9. Fees transferred to delivery man
10. Admin monitors all activities via dashboard
