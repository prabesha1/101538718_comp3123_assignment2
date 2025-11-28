# Employee Management System - Backend API

Node.js/Express REST API with JWT authentication and MongoDB.

## Tech Stack

- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- Multer (File Upload)
- bcryptjs (Password Hashing)

## Setup

### Install Dependencies
```bash
npm install
```

### Environment Configuration
Create `.env` file:
```env
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/comp3123_assignment
JWT_SECRET=your_secret_key_here
```

### Start MongoDB
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or use local MongoDB installation
mongod
```

### Run Server
```bash
npm start
```
Server runs on: http://localhost:5001

## API Endpoints

### Authentication
- `POST /api/signup` - Register new user
- `POST /api/login` - User login (returns JWT token)

### Employees (Protected)
- `GET /api/employees` - Get all employees
- `GET /api/employees/search/by?department=IT&position=Manager` - Search
- `POST /api/employees` - Create employee (supports image upload)
- `GET /api/employees/:id` - Get employee by ID
- `PUT /api/employees/:id` - Update employee (supports image upload)
- `DELETE /api/employees/:id` - Delete employee

## Authentication

Include JWT token in request headers:
```
Authorization: Bearer <token>
```

## File Upload

Employee endpoints support profile image upload via `multipart/form-data`.
Images are stored in `/uploads` directory.

## Project Structure

```
src/
├── config/
│   └── db.js               # MongoDB connection
├── middleware/
│   ├── auth.js             # JWT verification
│   └── upload.js           # Multer configuration
├── models/
│   ├── Employee.js         # Employee schema
│   └── User.js             # User schema
├── routes/
│   ├── auth.routes.js      # Auth endpoints
│   └── employee.routes.js  # Employee endpoints
└── server.js               # Express app setup
```



