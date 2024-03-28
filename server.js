//----------------Create Express Server----------------//
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as templating engine 
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
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

//-------------Create and Using Middleware---------------//
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
  }
  
  // Use the middleware
  app.use(logger);

//--------------Implement the Server and Middleware--------------//
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Custom logger middleware
const loggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}]: ${req.method} ${req.path}`);
    next();
};

// Custom authentication middleware
const authenticationMiddleware = (req, res, next) => {
    // Simulating authentication by checking for a custom header 'X-Auth-Token'
    const authToken = req.headers['x-auth-token'];
    if (authToken === 'secret-token') {
        next();
    } else {
        res.status(403).send('Unauthorized');
    }
};

// Applying the logger middleware globally
app.use(loggerMiddleware);

// Example protected route using the authentication middleware
app.get('/protected', authenticationMiddleware, (req, res) => {
    res.send('You have accessed a protected route!');
});

// A public route
app.get('/', (req, res) => {
    res.send('Welcome to the Transportation Agency API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
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

// Routes
app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const user = { id: users.length + 1, ...req.body };
    users.push(user);
    res.status(201).send(user);
});

app.get('/vehicles', (req, res) => {
    res.json(vehicles);
});

app.post('/vehicles', (req, res) => {
    const vehicle = { id: vehicles.length + 1, ...req.body };
    vehicles.push(vehicle);
    res.status(201).send(vehicle);
});

app.get('/bookings', (req, res) => {
    res.json(bookings);
});

app.post('/bookings', (req, res) => {
    const booking = { id: bookings.length + 1, ...req.body };
    bookings.push(booking);
    res.status(201).send(booking);
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Sorry, can’t find that!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 

//------------Utilize Reasonable data structure---------//
//Define data models
// let users = [{ id: 1, name: 'John Doe', bookings: [] }];
// let vehicles = [{ id: 1, model: 'Tesla Model S', bookings: [] }];
// let bookings = [{ id: 1, userId: 1, vehicleId: 1, status: 'confirmed' }];
// used in users.js



  //-------------Rendering Views with EJS--------------//