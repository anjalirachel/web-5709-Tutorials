const users = [];

exports.handler = async (event) => {
  const { httpMethod, path, body } = event;
  const userId = path.split("/").pop();

  switch (httpMethod) {
    case "GET":
      if (path === "/api/users") {
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "Users retrieved",
            success: true,
            users,
          }),
        };
      } else if (path.startsWith("/api/user/")) {
        const user = users.find((u) => u.id === userId);
        if (user) {
          return {
            statusCode: 200,
            body: JSON.stringify({
              success: true,
              user,
            }),
          };
        } else {
          return {
            statusCode: 404,
            body: JSON.stringify({
              message: "User not found",
              success: false,
            }),
          };
        }
      }
      break;

    case "POST":
      if (path === "/api/add") {
        try {
          const { email, firstName } = JSON.parse(body);
          if (!email || !firstName) {
            throw new Error("Missing required fields (email, firstName)");
          }
          const id = Math.random().toString(36).substr(2, 9);
          const newUser = { email, firstName, id };
          users.push(newUser);
          return {
            statusCode: 201,
            body: JSON.stringify({
              message: "User added",
              success: true,
            }),
          };
        } catch (error) {
          return {
            statusCode: 400,
            body: JSON.stringify({
              message: error.message || "Invalid request data",
              success: false,
            }),
          };
        }
      }
      break;

    case "PUT":
      if (path.startsWith("/api/update/")) {
        try {
          const { email, firstName } = JSON.parse(body);
          const userIndex = users.findIndex((u) => u.id === userId);
          if (userIndex !== -1) {
            if (email) users[userIndex].email = email;
            if (firstName) users[userIndex].firstName = firstName;
            return {
              statusCode: 200,
              body: JSON.stringify({
                message: "User updated",
                success: true,
              }),
            };
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          return {
            statusCode: 404,
            body: JSON.stringify({
              message: error.message || "User not found",
              success: false,
            }),
          };
        }
      }
      break;

    default:
      return {
        statusCode: 405,
        body: JSON.stringify({
          message: "Method not allowed",
          success: false,
        }),
      };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Bad request",
      success: false,
    }),
  };
};
