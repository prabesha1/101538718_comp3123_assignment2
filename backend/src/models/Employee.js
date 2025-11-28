const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number },
    date_of_joining: { type: Date },
    profileImage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);

