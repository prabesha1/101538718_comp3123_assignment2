const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    profileImage: { type: String }, // store path or URL
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);

