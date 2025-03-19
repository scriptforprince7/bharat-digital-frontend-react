# E-commerce Frontend: Product Listing & Order Placement

## Overview
This project builds the frontend for an e-commerce platform, integrating with Django and Node.js APIs. It supports product browsing, order placement, authentication, and real-time notifications.

---

## Features

### 1. Product Listing Page
- **Data Source:** Fetch product data from the Django API
- **Display:** Show product name, description, price, and stock availability in a grid layout
- **Search & Filter:** Users can search by product name and filter by price, availability, etc.

### 2. Order Placement Page
- **Select Product:** Users choose a product and specify quantity
- **Order Summary:** Displays total price, product details, and stock confirmation before finalizing the order
- **Real-Time Status:** Shows live order status updates (Pending → Shipped → Delivered)

### 3. Notifications
- **Order Success:** Toast/pop-up notification when an order is placed successfully
- **Live Status Updates:** Real-time order status updates using WebSockets or Firebase

### 4. Authentication
- **Login:** JWT-based API login system
- **Protected Routes:** Restrict order placement and user data pages to logged-in users

---

## Bonus Features (Optional)
- **Dark Mode:** Toggle between light and dark themes
- **Admin Panel:** Manage products directly from a web UI
- **Mobile-Friendly:** Fully responsive layout for phones and tablets

---

## Setup Guide

### Prerequisites
Ensure you have the following installed:
- Node.js 18+
- npm/yarn
- Docker (optional)

### 1. Clone the Repository
```bash
$ git clone <repository_url>
$ cd frontend_project_directory
```

### 2. Install Dependencies
```bash
$ npm install
```

### 3. Environment Variables
Create a `.env` file:
```
REACT_APP_BACKEND_URL=http://localhost:8000/api/products
REACT_APP_ORDER_API=http://localhost:5000/api/orders
REACT_APP_WEBSOCKET_URL=ws://localhost:5000
REACT_APP_JWT_SECRET=your_jwt_secret
```

### 4. Run Development Server
```bash
$ npm start
```

### 5. API Access
Ensure the backend servers are running (Django & Node.js).

Access the frontend: `http://localhost:3000`

---

## User Workflow

1. **Login:**
   - Enter credentials to receive a JWT token
   - JWT is saved in local storage for future requests

2. **Product Listing:**
   - Search and filter products
   - View product details

3. **Order Placement:**
   - Select product, specify quantity
   - Review summary and confirm order
   - Receive toast notification for order success

4. **Real-Time Order Status:**
   - Email updates order status


---

## Contributors
- **Frontend:** React/Next.js
- **Backend:** Django & Node.js
- **Real-time:** WebSockets/Firebase
- **Design:** Mobile-first, responsive UI

