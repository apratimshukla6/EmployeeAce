const mongoose = require('mongoose');

// Mongoose schema for Employee
const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    performanceMetrics: {
        metric1: String,
        metric2: String,
        metric3: String
    },
    performanceScore: { type: Number, default: 0 } // Calculated performance score based on metrics
});

// Create a model from the schema
const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;