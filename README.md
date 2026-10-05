# 🛒 Cartify - Scalable E-Commerce Web Application

Cartify is a full-featured, scalable E-Commerce backend and dynamic web application built with **Node.js, Express, MongoDB, and EJS**. It features robust dual-role authentication, complete cart operations, order processing, and media management.

---

## 🚀 Live Demo & Repository
- **GitHub Repository:** [https://github.com/mdnazmusakib/e-shop](https://github.com/mdnazmusakib/e-shop)


---

## ✨ Key Features & Highlights

### 🔒 Authentication & Authorization
- **Dual-Role Access:** Separate permissions and workflows for **Customers** and **Store Owners (Admins)**.
- **Secure JWT Authentication:** Tokens stored in `HTTP-only` secure cookies to prevent XSS attacks.
- **Password Security:** Hashed passwords using `Bcrypt` before saving to MongoDB.

### 📦 E-Commerce Operations
- **Product Management:** Full CRUD operations for store owners, including image uploads handled via `Multer`.
- **Shopping Cart:** Persistent user cart session with real-time total price calculation.
- **Order Tracking:** Relational document population using Mongoose `.populate()` for seamless order history tracking.

### 🛠️ Architecture & Validation
- **MVC Architecture:** Clean division of responsibility between Models, Views, and Controllers for maintainability.
- **Data Validation:** Strict payload and dynamic form data validation using `Joi`.
- **API Testing:** Comprehensive API testing and endpoint collection designed using `Postman`.

---

## 🛠️ Tech Stack & Tools

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM
- **Templating Engine:** EJS (Embedded JavaScript)
- **Security & Auth:** JSON Web Tokens (JWT), Bcrypt, Joi
- **File Handling:** Multer
- **API Testing & Tools:** Postman, Git, GitHub

---

## 📂 Project Structure

```text
Cartify/
├── controllers/     # Application business logic
├── models/          # Mongoose database schemas
├── routes/          # API & page route definitions
├── views/           # Dynamic EJS templates
├── middlewares/     # Authentication & Multer upload middlewares
├── public/          # Static assets (CSS, JS, Images)
├── utils/           # Joi validation schemas & helper functions
├── .env.example     # Environment variables blueprint
├── server.js        # Entry point of the application
└── README.md