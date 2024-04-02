//--------------Creating a Get Routes for all datas that has to be exposed----------//
// Define my datas for simplicity
let users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
let vehicles = [{ id: 1, model: 'Tesla Model S', year: 2020 }];
let bookings = [{ id: 1, userId: 1, vehicleId: 1, date: '2024-03-25' }];

//------------Creating RESTful API Endpoints-------------//
let routes = []; 
// This will store routes data

app.get('/api/routes', (req, res) => {
  res.json(routes);
});

app.post('/api/routes', (req, res) => {
  const newRoute = req.body; // Add validation in real app
  routes.push(newRoute);
  res.status(201).send(newRoute);
});

// A static route
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
// let users = [{ id: 1, name: 'John Doe' }];
// let vehicles = [{ id: 1, model: 'Tesla Model S' }];
// let bookings = [{ id: 1, userId: 1, vehicleId: 1 }];


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