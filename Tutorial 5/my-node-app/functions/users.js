const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let users = [
  { email: 'abc@abc.ca', firstName: 'ABC', id: '5abf6783' },
  { email: 'xyz@xyz.ca', firstName: 'XYZ', id: '5abf674563' }
];

// GET all users
app.get('/users', (req, res) => {
  res.status(200).json({
    message: 'Users retrieved',
    success: true,
    users: users
  });
});

// GET user by ID
app.get('/user/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    res.status(200).json({
      success: true,
      user: user
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
});

// POST add user
app.post('/add', (req, res) => {
  const newUser = {
    email: req.body.email,
    firstName: req.body.firstName,
    id: uuidv4() // Generate a unique ID for the new user
  };
  users.push(newUser);
  res.status(201).json({
    message: 'User added',
    success: true
  });
});

// PUT update user
app.put('/update/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex !== -1) {
    users[userIndex].email = req.body.email || users[userIndex].email;
    users[userIndex].firstName = req.body.firstName || users[userIndex].firstName;
    res.status(200).json({
      message: 'User updated',
      success: true
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
});

// Create a basic HTTP server
const server = http.createServer(app);

// Define the port and start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
