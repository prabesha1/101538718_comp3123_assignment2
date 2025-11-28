require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const employeeRoutes = require('./routes/employee.routes');

const app = express();

// CORS configuration - allow all origins for development
app.use(cors({
  origin: '*', // Allow all origins (for development)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  console.log('Headers:', {
    'content-type': req.headers['content-type'],
    'authorization': req.headers['authorization'] ? 'Bearer ...' : 'none'
  });
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  next();
});

// serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Root route - API info
app.get('/', (req, res) => {
  res.json({
    message: '🚀 COMP3123 Assignment API - Server is running!',
    status: 'OK',
    endpoints: {
      auth: {
        signup: 'POST /api/signup',
        login: 'POST /api/login'
      },
      employees: {
        create: 'POST /api/employees (requires auth)',
        getAll: 'GET /api/employees (requires auth)',
        search: 'GET /api/employees/search/by?department=IT&position=Manager (requires auth)',
        getById: 'GET /api/employees/:id (requires auth)',
        update: 'PUT /api/employees/:id (requires auth)',
        delete: 'DELETE /api/employees/:id (requires auth)'
      }
    },
    documentation: 'See README.md for complete API documentation'
  });
});

// routes prefix
app.use('/api', authRoutes);             // /api/signup, /api/login
app.use('/api/employees', employeeRoutes);

// 404 handler - must come after all routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.path,
    method: req.method,
    availableEndpoints: {
      auth: ['POST /api/signup', 'POST /api/login'],
      employees: ['GET /api/employees', 'POST /api/employees', 'GET /api/employees/:id', 'PUT /api/employees/:id', 'DELETE /api/employees/:id']
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);

  // Handle JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'Invalid JSON in request body',
      error: err.message
    });
  }

  // Handle other errors
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5001;

connectDB();

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

