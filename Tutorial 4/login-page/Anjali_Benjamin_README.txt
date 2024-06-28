# CSCI 5709 Assignments

# Tutorial 4

- _Date Created_: 22 June 2024
- _Last Modification Date_: 28 June 2024
- _Git URL_: <https://git.cs.dal.ca/abenjamin/csci-5709-tutorials/-/tree/main/Tutorial%204?ref_type=heads>
- _Netlify URL_: <https://iridescent-daifuku-5528f7.netlify.app/>

## Authors

- Anjali Rachel Benjamin (an653262@dal.ca) - Owner

## Getting Started

See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
Node.js
npm
Visual Studio Code
React.js
API Integration

```

See the following section for detailed step-by-step instructions on how to install this software / libraries / plug-ins

### Installing the Node.js

A step by step series of installing Node.js

Say what the step will be, assume the marker just acquired a computer

```
Install Node.js and npm

In Visual Studio Code Terminal create a new React Project

- npx create-react-app my-react-app

Navigate to your react app

- cd my-react-app

Start the npm server to see your react app run locally

- npm start

```

## Deployment

1. First login with your Github account.
2. Authorize Netlify.
3. Select the Repo that is to be deployed.
4. Configure your settings.
5. Build your site.
6. The site is deployed.

## Sources Used

<https://fonts.google.com/selection/embed>
<https://www.freecodecamp.org/news/how-to-fetch-api-data-in-react/>
<https://medium.com/geekculture/create-a-simple-search-component-in-react-js-using-react-hooks-710c1dfe8b58>

## Artificial Intelligence Tools Used

## Prompt

How to implement a search functionality of users in react.js filtered by first name or last name

## Response

import React, { useState, useEffect } from 'react';

const UserSearch = () => {
const [users, setUsers] = useState([]);
const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
// Fetch users data from an API or local storage
// Example:
// fetchUsers().then(data => setUsers(data));
}, []);

return (

<div>
<input
type="text"
placeholder="Search by First Name or Last Name"
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
/>
<ul>
{users.filter(user =>
user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
).map((user, index) => (
<li key={index}>{user.firstName} {user.lastName}</li>
))}
</ul>
</div>
);
}

export default UserSearch;

## My code

useEffect(() => {
const fetchUsers = async () => {
try {
const response = await fetch('https://express-t4.onrender.com/api/users');
const data = await response.json();
setUsers(data);
} catch (error) {
console.error('Error fetching users:', error);
}
};

    fetchUsers();

}, []);

const handleSearch = (e) => {
setSearchTerm(e.target.value);
};

const filteredUsers = users.filter(user => {
const name = user.name ? user.name.toLowerCase() : '';
const searchTermLower = searchTerm.toLowerCase();
return name.includes(searchTermLower);
});

-- Here I did user first name and last name because that was not the way the values were stored. It was only name.

## Built With

- [React.js](https://react.dev/learn/) - The web framework used
