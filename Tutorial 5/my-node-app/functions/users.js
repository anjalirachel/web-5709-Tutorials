const { v4: uuidv4 } = require('uuid');

let users = [
  { email: 'abc@abc.ca', firstName: 'ABC', id: '5abf6783' },
  { email: 'xyz@xyz.ca', firstName: 'XYZ', id: '5abf674563' }
];

// GET all users
exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    // GET /users endpoint
    if (event.path === '/users') {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Users retrieved',
          success: true,
          users: users
        })
      };
    }

    // GET /user/:id endpoint
    else if (event.path.startsWith('/user/')) {
      const userId = event.path.split('/')[2];
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

    // Handle other GET requests
    else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          message: 'Endpoint not found'
        })
      };
    }
  }

  // Handle other HTTP methods
  else {
    return {
      statusCode: 405,
      body: JSON.stringify({
        success: false,
        message: 'Method not allowed'
      })
    };
  }
};

// POST add user
exports.add = async (event, context) => {
  if (event.httpMethod === 'POST') {
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
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({
        success: false,
        message: 'Method not allowed'
      })
    };
  }
};

// PUT update user
exports.update = async (event, context) => {
  if (event.httpMethod === 'PUT') {
    const userId = event.path.split('/')[2];
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
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({
        success: false,
        message: 'Method not allowed'
      })
    };
  }
};
