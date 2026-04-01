console.log("Backend project started");
const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Dummy data
let employees = [];

// Home route
app.get("/", (req, res) => {
  res.send("Backend Server is Running 🚀");
});

// Get all employees
app.get("/employees", (req, res) => {
  res.json(employees);
});

// Add new employee
app.post("/employees", (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ message: "Name and role are required" });
  }

  const newEmployee = {
    id: employees.length + 1,
    name,
    role,
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// Update employee
app.put("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, role } = req.body;

  const employee = employees.find(emp => emp.id === id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  employee.name = name || employee.name;
  employee.role = role || employee.role;

  res.json(employee);
});

// Delete employee
app.delete("/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);

  employees = employees.filter(emp => emp.id !== id);

  res.json({ message: "Employee deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
