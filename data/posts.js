const express = require("express");
const router = express.Router();
const app = express
const posts = require("../data/posts");
const error = require("../utilities/error");
const port = 3000;


//-----------create POST routes for data---------//
router
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Sample initial data
let users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
let vehicles = [{ id: 1, model: 'Tesla Model S', year: 2020 }];
let bookings = [{ id: 1, userId: 1, vehicleId: 1, date: '2024-03-25' }];

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//add post routes for creation of new user
// Create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    
    // Simple validation
    if (!name || !email) {
      return res.status(400).send('Missing name or email.');
    }
  
    // Create a new user object
    const newUser = {
      id: users.length + 1, // Simple ID assignment logic for demonstration purposes
      name,
      email
    };
  
    users.push(newUser); // Add the new user to the array
    res.status(201).send(newUser); // Return the newly created user
  });