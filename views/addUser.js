const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Your routes and middleware
 // Create a new user object
 const newUser = {
    id: users.length + 1, // Simple ID assignment logic for demonstration purposes
    name,
    email
  };

  users.push(newUser); // Add the new user to the array
  res.status(201).send(newUser); // Return the newly created user;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));