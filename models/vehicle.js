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

app.get('/vehicles', (req, res) => {
    let { type, status } = req.query; // Extract query parameters
    let filteredVehicles = vehicles; // Start with all vehicles
  
    // Filter by type if the type query parameter is provided
    if (type) {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.type === type);
    }
  
    // Filter by status if the status query parameter is provided
    if (status) {
      filteredVehicles = filteredVehicles.filter(vehicle => vehicle.status === status);
    }
  
    // Return the filtered list of vehicles
    res.json(filteredVehicles);
  });