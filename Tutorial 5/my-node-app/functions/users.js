// Import required modules
const { v4: uuidv4 } = require('uuid');

// Data store for users (mocked database)
let users = [
  { email: 'abc@abc.ca', firstName: 'ABC', id: '5abf6783' },
  { email: 'xyz@xyz.ca', firstName: 'XYZ', id: '5abf674563' }
];

// GET all users
exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET' && event.path === '/.netlify/functions/users') {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Users retrieved',
        success: true,
        users: users
      })
    };
  }

  // GET user by ID
  else if (event.httpMethod === 'GET' && event.path.startsWith('/.netlify/functions/user/')) {
    const userId = event.path.split('/')[3];
    const user = users.find(u => u.id === userId);
    if (user) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          user: user
        })
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          message: 'User not found'
        })
      };
    }
  }

  // POST add user
  else if (event.httpMethod === 'POST' && event.path === '/.netlify/functions/users') {
    const { email, firstName } = JSON.parse(event.body);
    const newUser = {
      email: email,
      firstName: firstName,
      id: uuidv4()
    };
    users.push(newUser);
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'User added',
        success: true
      })
    };
  }

  // PUT update user
  else if (event.httpMethod === 'PUT' && event.path.startsWith('/.netlify/functions/user/')) {
    const userId = event.path.split('/')[3];
    const { email, firstName } = JSON.parse(event.body);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].email = email || users[userIndex].email;
      users[userIndex].firstName = firstName || users[userIndex].firstName;
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'User updated',
          success: true
        })
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          message: 'User not found'
        })
      };
    }
  }

  // Handle other requests
  else {
    return {
      statusCode: 404,
      body: JSON.stringify({
        success: false,
        message: 'Endpoint not found'
      })
    };
  }
};
