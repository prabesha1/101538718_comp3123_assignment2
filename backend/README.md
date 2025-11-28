# COMP3123 Assignment - Backend API

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment** (`.env` file):
   ```
   PORT=5001
   MONGO_URI=mongodb://127.0.0.1:27017/comp3123_assignment
   JWT_SECRET=your_secret_key_here
   ```

3. **Start MongoDB** (Docker recommended):
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

4. **Start the server**:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication (Public)

- **POST** `/api/signup` - Create user account
- **POST** `/api/login` - Login and get JWT token

### Employees (Protected - Requires JWT)

- **POST** `/api/employees` - Create employee
- **GET** `/api/employees` - Get all employees
- **GET** `/api/employees/search/by?department=IT&position=Manager` - Search employees
- **GET** `/api/employees/:id` - Get employee by ID
- **PUT** `/api/employees/:id` - Update employee
- **DELETE** `/api/employees/:id` - Delete employee

## Example Requests

### Signup
```bash
curl -X POST http://localhost:5001/api/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5001/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Create Employee (with token from login)
```bash
curl -X POST http://localhost:5001/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","department":"IT","position":"Developer"}'
```


