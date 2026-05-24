# Trading App 🚀

A full-stack stock trading platform inspired by Zerodha, built using the MERN stack. The application allows users to authenticate securely, view live stock prices, buy/sell stocks, manage holdings, and track portfolio profit/loss in real time.

---

## Features ✨

* 🔐 JWT-based Authentication
* 📈 Live Stock Price Integration using External APIs
* 💹 Buy/Sell Stock Functionality
* 📊 Portfolio Profit/Loss Calculation
* 📉 Stock Price Visualization using Charts.js
* 🔍 Stock Search Functionality
* 📂 Holdings and Orders Management
* 🌐 Fully Deployed Full-Stack Application

---

## Tech Stack 🛠️

### Frontend

* React.js
* Axios
* Charts.js
* CSS / Bootstrap

### Backend

* Node.js
* Express.js
* JWT Authentication
* REST APIs

### Database

* MongoDB

---

## System Architecture ⚙️

1. Users sign up/login securely using JWT authentication.
2. Frontend communicates with backend APIs using Axios.
3. Backend processes requests and interacts with MongoDB.
4. Live stock prices are fetched using a third-party API.
5. Holdings and orders are updated dynamically after transactions.
6. Charts.js is used for visualizing stock trends and portfolio analytics.

---

## Database Collections 📁

### Users

Stores:

* User credentials
* Authentication information

### Holdings

Stores:

* Purchased stocks
* Quantity
* Average buy price

### Orders

Stores:

* Buy/Sell transactions
* Order history
* Transaction timestamps

---

## Key Functionalities 🚀

### Authentication

* Secure JWT-based login/signup
* Protected routes for authenticated users

### Portfolio Management

* Track current holdings
* Monitor profit/loss
* Daily gain/loss calculations

### Trading Features

* Buy and sell stocks
* Search stocks dynamically
* View real-time stock prices

---

## Future Improvements 📌

* Real-time updates using WebSockets
* Watchlist functionality
* Advanced portfolio analytics
* Payment gateway integration
* Better caching and API optimization

---

## Installation & Setup ⚡

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## Environment Variables 🔑

Create a `.env` file and add:

```env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
STOCK_API_KEY=your_api_key
```

---


## Deployment 🌍

Frontend and backend are deployed separately with environment variable configuration for secure API handling.

---

## Author 👨‍💻

Akshat Srivastava
