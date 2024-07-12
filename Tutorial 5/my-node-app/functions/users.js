// functions/users.js

const { v4: uuidv4 } = require('uuid');

let users = [
  { email: 'abc@abc.ca', firstName: 'ABC', id: '5abf6783' },
  { email: 'xyz@xyz.ca', firstName: 'XYZ', id: '5abf674563' }
];

exports.handler = async (event, context) => {
  switch (event.httpMethod) {
    case 'GET':
      if (event.path === '/users') {
        return getUsers();
      } else if (event.path.startsWith('/user/')) {
        return getUserById(event);
      } else {
        return notFound();
      }
      break;
    case 'POST':
      if (event.path === '/users') {
        return addUser(event);
      } else {
        return notAllowed();
      }
      break;
    case 'PUT':
      if (event.path.startsWith('/user/')) {
        return updateUser(event);
      } else {
        return notAllowed();
      }
      break;
    default:
      return notAllowed();
  }
};

function getUsers() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Users retrieved',
      success: true,
      users: users
    })
  };
}

function getUserById(event) {
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

function addUser(event) {
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

function updateUser(event) {
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
}

function notFound() {
  return {
    statusCode: 404,
    body: JSON.stringify({
      success: false,
      message: 'Endpoint not found'
    })
  };
}

function notAllowed() {
  return {
    statusCode: 405,
    body: JSON.stringify({
      success: false,
      message: 'Method not allowed'
    })
  };
}
