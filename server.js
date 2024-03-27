//----------------Create Epress Server----------------//
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
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

// Set EJS as templating engine 
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index');
//Public route
  res.send('Welcome to the Transportation Agency API!');
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

  //-------------Rendering Views with EJS--------------//