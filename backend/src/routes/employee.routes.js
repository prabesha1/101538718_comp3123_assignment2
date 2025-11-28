const express = require('express');
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// All routes use auth
router.use(auth);

// POST /employees  (with file)
router.post('/', upload.single('profileImage'), async (req, res) => {
  try {
    const { first_name, last_name, email, department, position, salary, date_of_joining } = req.body;

    const employee = await Employee.create({
      first_name,
      last_name,
      email,
      department,
      position,
      salary,
      date_of_joining,
      profileImage: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    res.status(201).json(employee);
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(500).json({ message: 'Error creating employee', error: err.message });
  }
});

// GET /employees
router.get('/', async (req, res) => {
  const employees = await Employee.find().sort({ createdAt: -1 });
  res.json(employees);
});

// GET /employees/search?department=IT&position=Manager
router.get('/search/by', async (req, res) => {
  const { department, position } = req.query;
  const filter = {};
  if (department) filter.department = department;
  if (position) filter.position = position;

  const results = await Employee.find(filter);
  res.json(results);
});

// GET /employees/:id
router.get('/:id', async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  if (!emp) return res.status(404).json({ message: 'Not found' });
  res.json(emp);
});

// PUT /employees/:id  (allow optional new file)
router.put('/:id', upload.single('profileImage'), async (req, res) => {
  const update = { ...req.body };
  if (req.file) {
    update.profileImage = `/uploads/${req.file.filename}`;
  }
  const emp = await Employee.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });
  res.json(emp);
});

// DELETE /employees/:id
router.delete('/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted' });
});

module.exports = router;

