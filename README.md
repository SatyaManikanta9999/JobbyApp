# Jobby App

Jobby App is a job search web application built using **React.js** that allows users to explore job opportunities, filter jobs based on employment type and salary range, and view detailed job information.

This project was developed as part of the **NxtWave CCBP 4.0 Full Stack Developer Program**.

---

## 🚀 Features

* Secure **JWT Authentication**
* **Protected Routes** for authorized users
* View available job listings
* Search jobs using keywords
* Filter jobs by **Employment Type**
* Filter jobs by **Salary Range**
* View detailed information about each job
* View **Similar Jobs**
* Profile section showing user information
* Loading states with loader
* Error handling with retry functionality
* Logout functionality

---

## 🛠 Tech Stack

Frontend:

* React.js
* JavaScript (ES6)
* CSS3

Libraries Used:

* react-router-dom
* js-cookie
* react-loader-spinner
* react-icons

---

## 📂 Project Structure

```
src
│
├── components
│   ├── Header
│   ├── Home
│   ├── Login
│   ├── Jobs
│   ├── JobItemDetails
│   ├── ProtectedRoute
│   └── NotFound
│
├── App.js
├── index.js
└── App.css
```

---

## 🔐 Authentication

The application uses **JWT Token Authentication**.

When the user logs in:

* JWT token is received from the API
* Token is stored using **cookies**
* Protected routes verify the token before allowing access

If the token is not available, the user is redirected to the **Login page**.

---

## 📌 Application Routes

| Route        | Description       |
| ------------ | ----------------- |
| `/login`     | Login Page        |
| `/`          | Home Page         |
| `/jobs`      | Jobs Listing Page |
| `/jobs/:id`  | Job Details Page  |
| `/not-found` | Not Found Page    |

---

## 🔎 Functionalities

### Login Page

* Allows users to log in using username and password
* Displays error message for invalid credentials
* Stores JWT token after successful login

### Home Page

* Displays application introduction
* Navigation to the Jobs page

### Jobs Page

Users can:

* View available jobs
* Search jobs using keywords
* Filter jobs by employment type
* Filter jobs by salary range
* View job cards with company information

### Job Details Page

Displays:

* Company logo
* Job title
* Rating
* Location
* Employment type
* Salary package
* Job description
* Skills required
* Life at company section
* Similar jobs

### Profile Section

Shows:

* Profile image
* Name
* Short bio

---

## ⚙️ Installation & Setup

Install dependencies:

```
npm install
```

Start the application:

```
npm start
```

The application will run on:

```
http://localhost:3000
```

---

## 🎯 Learning Outcomes

Through this project I learned:

* React Component Architecture
* React Router Navigation
* Protected Routes
* API Integration
* State Management
* Handling Authentication using Cookies
* Building dynamic UI with React

---

## 👨‍💻 Author

Satya Manikanta Reddy

GitHub
https://github.com/SatyaManikanta9999
