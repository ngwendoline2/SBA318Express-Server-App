
// Create a new vehicle
app.post('/vehicles', (req, res) => {
    const newVehicle = { id: vehicles.length + 1, model: req.body.model, bookings: [] };
    vehicles.push(newVehicle);
    res.status(201).json(newVehicle);
});

  
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

module.exports = vehicles;