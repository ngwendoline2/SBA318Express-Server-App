const express = require("express");
const router = express.Router();

const users = require("../data/users");
const error = require("../utilities/error");

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

// List all vehicles
app.get('/vehicles', (req, res) => {
    res.json(vehicles);
});

// Create a new booking
app.post('/bookings', (req, res) => {
    const { userId, vehicleId } = req.body;
    const newBooking = { id: bookings.length + 1, userId, vehicleId, status: 'confirmed' };

    // Add the booking to the user and vehicle
    const user = users.find(user => user.id === userId);
    const vehicle = vehicles.find(vehicle => vehicle.id === vehicleId);

    if (!user || !vehicle) {
        return res.status(400).send('User or Vehicle not found.');
    }

    user.bookings.push(newBooking.id);
    vehicle.bookings.push(newBooking.id);
    bookings.push(newBooking);

    res.status(201).json(newBooking);
});

// List all bookings
app.get('/bookings', (req, res) => {
    res.json(bookings.map(booking => {
        const user = users.find(user => user.id === booking.userId)?.name;
        const vehicle = vehicles.find(vehicle => vehicle.id === booking.vehicleId)?.model;
        return { ...booking, userName: user, vehicleModel: vehicle };
    }));
});

//--------------Creating a Get Routes for all datas that has to be exposed----------//
// Define my datas for simplicity
// let users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
// let vehicles = [{ id: 1, model: 'Tesla Model S', year: 2020 }];
// let bookings = [{ id: 1, userId: 1, vehicleId: 1, date: '2024-03-25' }];

//------------- Get all users---------------//
app.get('/users', (req, res) => {
    res.json(users);
  });
  
  // Get a single user by ID
  app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found.');
    res.json(user);
  });
  
  // Get all vehicles
  app.get('/vehicles', (req, res) => {
    res.json(vehicles);
  });
  
  // Get a single vehicle by ID
  app.get('/vehicles/:id', (req, res) => {
    const vehicle = vehicles.find(v => v.id === parseInt(req.params.id));
    if (!vehicle) return res.status(404).send('Vehicle not found.');
    res.json(vehicle);
  });
  
  // Get all bookings
  app.get('/bookings', (req, res) => {
    res.json(bookings);
  });
  