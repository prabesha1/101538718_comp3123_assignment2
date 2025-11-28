# Employee Management System

Full-stack MERN application for managing employees with authentication, CRUD operations, image upload, and search functionality.

## Tech Stack

**Frontend:**
- React 19.2.0
- React Router DOM 6.30.2
- Bootstrap 5.3.8
- Axios 1.13.2

**Backend:**
- Node.js & Express
- MongoDB
- JWT Authentication
- Multer (File Upload)
- bcryptjs (Password Hashing)

## Features

- User Authentication (Signup/Login with JWT)
- Employee CRUD Operations
- Profile Image Upload
- Search by Department/Position
- Responsive Bootstrap UI
- Protected Routes

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend:
```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/comp3123_assignment
JWT_SECRET=your_secret_key_here
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend:
```env
REACT_APP_API_BASE_URL=http://localhost:5001/api
```

## Running the Application

### Start Backend
```bash
cd backend
npm start
```
Server runs on: http://localhost:5001

### Start Frontend
```bash
cd frontend
npm start
```
App runs on: http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/signup` - Register new user
- `POST /api/login` - User login

### Employees (Protected)
- `GET /api/employees` - Get all employees
- `GET /api/employees/search/by?department=IT&position=Manager` - Search employees
- `POST /api/employees` - Create employee (with image upload)
- `GET /api/employees/:id` - Get single employee
- `PUT /api/employees/:id` - Update employee (with image upload)
- `DELETE /api/employees/:id` - Delete employee

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── upload.js
│   │   ├── models/
│   │   │   ├── Employee.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── employee.routes.js
│   │   └── server.js
│   └── uploads/
│
└── frontend/
    ├── public/
    └── src/
        ├── api/
        │   └── axiosClient.js
        ├── auth/
        │   ├── AuthContext.js
        │   └── PrivateRoute.js
        ├── components/
        │   └── Layout.js
        ├── pages/
        │   ├── LoginPage.js
        │   ├── SignupPage.js
        │   ├── EmployeeListPage.js
        │   ├── EmployeeAddPage.js
        │   ├── EmployeeViewPage.js
        │   └── EmployeeEditPage.js
        ├── App.js
        ├── App.css
        └── index.js
```

## Author

Prabesh Shrestha - Student ID: 101538718  
COMP3123 - Full Stack Development  
George Brown College

## License

This project is for educational purposes.

