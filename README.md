# Canton Row — E-Commerce Website

A modern, minimalist e-commerce website for exploring sneakers, bags, jerseys, and apparel. Built as a full-stack web development project using JavaScript, Node.js, Express.js, and MongoDB.

## Overview

Canton Row is a product-catalogue-based shopping website designed with a premium, clean, and user-friendly interface. It connects a frontend built with HTML, CSS, and JavaScript to a backend API powered by Node.js, Express.js, and MongoDB.

## Features

- **Product Catalogue:** Browse products with images, prices, brands, and categories.
- **Product Details:** View individual product information, available sizes, and colors.
- **Database Integration:** Store and retrieve product information using MongoDB and Mongoose.
- **REST API:** Fetch products and retrieve individual product details through API endpoints.
- **Order Placement:** Submit customer details and place orders through the website.
- **Order Management:** Store orders in MongoDB and retrieve order history.
- **Responsive Interface:** Designed for a clean and convenient shopping experience.
- **Backend Validation:** Validate product information and order details on the server.

## Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js
- REST APIs

**Database**
- MongoDB
- Mongoose
- MongoDB Compass for database management

**Development Tools**
- Visual Studio Code
- Git and GitHub
- Postman
- Nodemon

## Project Structure

```text
canton-row-ecommerce/
├── config/
│   └── db.js
├── models/
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── productRoutes.js
│   └── orderRoutes.js
├── public/
│   ├── index.html
│   ├── catalog.html
│   ├── product.html
│   ├── orders.html
│   ├── css/
│   ├── js/
│   └── assets/
├── server.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

*Note: The structure above is a guide. Update the filenames if your local project differs.*

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB Community Server, or a MongoDB Atlas database
- Git

### 1. Clone the Repository

```bash
git clone https://
