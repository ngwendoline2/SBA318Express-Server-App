//----------------Create Express Server----------------//
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;
app.use(express.static('Public'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as templating engine 
app.set('view engine', 'ejs');

// Routes
app.get("/", (req, res) => {
  res.render('Hello there');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

//------------Creating RESTful API Endpoints-------------//
let routes = []; // This will store routes data

app.get('/api/routes', (req, res) => {
  res.json(routes);
});

app.post('/api/routes', (req, res) => {
  const newRoute = req.body; // Add validation in real app
  routes.push(newRoute);
  res.status(201).send(newRoute);
});

// A public route
app.get('/', (req, res) => {
    res.send('Welcome to the Transportation Agency API!');
});

 // Error-handling middleware
 app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack to console
    res.status(500).send('Something broke!');
});

//Error handling
// Route that causes an error
app.get('/error', (req, res, next) => {
    // Simulate an error
    const err = new Error('Example error');
    next(err); // Pass the error to the next function
});

//Customizing Error Responses
app.use((err, req, res, next) => {
    if (err instanceof SpecificError) {
        return res.status(400).json({ error: 'Specific error occurred' });
    }
    console.error(err.stack); // Log error stack to console
    res.status(500).json({ error: 'Something broke!' });
});

//---------------Server Routes, and middleware---------//
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mock data
let users = [{ id: 1, name: 'John Doe' }];
let vehicles = [{ id: 1, model: 'Tesla Model S' }];
let bookings = [{ id: 1, userId: 1, vehicleId: 1 }];

//------------Utilize Reasonable data structure---------//
//Define data models
// let (users)= [{ id: 1, name: 'John Doe', bookings: [] }];
// let (vehicles) = [{ id: 1, model: 'Tesla Model S', bookings: [] }];
// let (bookings) = [{ id: 1, userId: 1, vehicleId: 1, status: 'confirmed' }];
// used in users.js

// Create a new user
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name, bookings: [] };
    users.push(newUser);
    res.status(201).json(newUser);
});

// List all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Create a new vehicle
app.post('/vehicles', (req, res) => {
    const newVehicle = { id: vehicles.length + 1, model: req.body.model, bookings: [] };
    vehicles.push(newVehicle);
    res.status(201).json(newVehicle);
});

//--------------Creating a Get Routes for all datas that has to be exposed----------//
// Define my datas for simplicity
// let users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
// let vehicles = [{ id: 1, model: 'Tesla Model S', year: 2020 }];
// let bookings = [{ id: 1, userId: 1, vehicleId: 1, date: '2024-03-25' }];
  
  // Get all bookings
  app.get('/bookings', (req, res) => {
    res.json(bookings);
  });

    //-----------create POST routes for data---------//
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
    // Simple validation
    if ('!name || !email') {
      return res.status(400).send('Missing name or email.');
    }
//------------PATCH route to update user infos--------//

app.patch('/users/:id', (req, res) => {
    const { id } = req.params; // Extract the user ID from the URL path
    const { name, email } = req.body; // Extract the new name and email from the request body
  
    // Find the index of the user with the given ID
    const userIndex = users.findIndex(user => user.id === parseInt(id));
  
    // If the user is not found, return a 404 error
    if (userIndex === -1) {
      return res.status(404).send('User not found.');
    }
  
    // Update the user's name and email if provided
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
  
    // Return the updated user
    res.status(200).send(users[userIndex]);
  });

  //-----------DELETE route to selete a user------------//
  // DELETE route to delete a user by ID
app.delete('/users/:id', (req, res) => {
    const { id } = req.params; // Extract the user ID from the URL path
  
    // Attempt to find the user with the given ID
    const index = users.findIndex(user => user.id === parseInt(id));
  
    // If the user doesn't exist, return a 404 error
    if (index === -1) {
      return res.status(404).send('User not found.');
    }
  
    // Remove the user from the array
    const deletedUser = users.splice(index, 1);
  
    // Send back the deleted user data as confirmation
    res.status(200).json(deletedUser);
  });

  //------------ routes params, where appropriate----------------//
// GET a specific vehicle by ID
app.get('/vehicles/:id', (req, res) => {
    const { id } = req.params;
    const vehicle = vehicles.find(v => v.id === parseInt(id));
    if (!vehicle) return res.status(404).send('Vehicle not found.');
    res.json(vehicle);
  });

// DELETE a specific vehicle by ID
app.delete('/vehicles/:id', (req, res) => {
  const { id } = req.params;
  const index = vehicles.findIndex(v => v.id === parseInt(id));
  if (index === -1) return res.status(404).send('Vehicle not found.');

  const [deletedVehicle] = vehicles.splice(index, 1);
  res.json(deletedVehicle);
});

// PATCH a specific vehicle by ID (example: update status)
app.patch('/vehicles/:id', (req, res) => {
  const { id } = req.params;
  const vehicle = vehicles.find(v => v.id === parseInt(id));
  if (!vehicle) return res.status(404).send('Vehicle not found.');

  const { status } = req.body; // Assuming the request body contains the new status
  vehicle.status = status;
  res.json(vehicle);
});

//-------------Rendering Views with EJS--------------//

// Here's my project structure overview

// transportation-agency/
// │
// ├── node_modules/              # Node.js modules
// ├── public/                    # Static files (CSS, JS, images)
// │   └── css/
// │       └── style.css
// ├── src/
// │   ├── controllers/           # Route controllers (controller layer)
// │   │   ├── usersController.js
// │   │   └── vehiclesController.js
// │   ├── middleware/            # Custom middleware
// │   │   ├── errorHandler.js
// │   │   └── logger.js
// │   ├── models/                # Data models (schema definitions)
// │   │   ├── user.js
// │   │   └── vehicle.js
// │   ├── routes/                # Route definitions
// │   │   ├── index.js
// │   │   ├── users.js
// │   │   └── vehicles.js
// │   ├── views/                 # Templates / views
// │   │   ├── index.ejs
// │   │   ├── users.ejs
// │   │   └── vehicles.ejs
// │   └── app.js                 # App entry point
// ├── .env                       # Environment variables
// ├── package.json
// └── package-lock.jsoncontrollers