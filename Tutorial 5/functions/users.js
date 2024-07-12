const { v4: uuidv4 } = require('uuid');

let users = [
  { email: 'abc@abc.ca', firstName: 'ABC', id: '5abf6783' },
  { email: 'xyz@xyz.ca', firstName: 'XYZ', id: '5abf674563' }
];

exports.handler = async (event) => {
  const method = event.httpMethod;
  const { id } = event.queryStringParameters || {};
  const body = event.body ? JSON.parse(event.body) : {};

  try {
    if (method === 'GET' && !id) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Users retrieved",
          success: true,
          users: users
        })
      };
    } else if (method === 'POST') {
      const { email, firstName } = body;
      if (!email || !firstName) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: "Email and firstName are required",
            success: false
          })
        };
      }
      const newUser = { email, firstName, id: uuidv4() };
      users.push(newUser);
      return {
        statusCode: 201,
        body: JSON.stringify({
          message: "User added",
          success: true
        })
      };
    } else if (method === 'PUT' && id) {
      const { email, firstName } = body;
      const user = users.find(user => user.id === id);
      if (!user) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: "User not found",
            success: false
          })
        };
      }
      if (email) user.email = email;
      if (firstName) user.firstName = firstName;
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "User updated",
          success: true
        })
      };
    } else if (method === 'GET' && id) {
      const user = users.find(user => user.id === id);
      if (!user) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            message: "User not found",
            success: false
          })
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          user: user
        })
      };
    } else {
      return {
        statusCode: 405,
        body: JSON.stringify({
          message: "Method not allowed",
          success: false
        })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
        success: false
      })
    };
  }
};
