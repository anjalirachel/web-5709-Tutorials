const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Example in-memory storage
let users = [
  { id: '5abf6783', email: 'abc@abc.ca', firstName: 'ABC' },
  { id: '5abf674563', email: 'xyz@xyz.ca', firstName: 'XYZ' }
];

// Helper function to generate a new ID
const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// GET all users
app.get('/users', (req, res) => {
  res.status(200).json({
    message: "Users retrieved",
    success: true,
    users: users
  });
});

// POST add a new user
app.post('/add', (req, res) => {
  const { email, firstName } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({ message: "Email and firstName are required", success: false });
  }

  const newUser = { id: generateId(), email, firstName };
  users.push(newUser);
  
  res.status(201).json({
    message: "User added",
    success: true
  });
});

// PUT update user
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { email, firstName } = req.body;

  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  if (email) user.email = email;
  if (firstName) user.firstName = firstName;

  res.status(200).json({
    message: "User updated",
    success: true
  });
});

// GET user by ID
app.get('/user/:id', (req, res) => {
  const { id } = req.params;

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  res.status(200).json({
    success: true,
    user: user
  });
});

// Error handling for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found", success: false });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error", success: false });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
