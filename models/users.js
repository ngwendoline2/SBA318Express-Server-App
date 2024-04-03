export { models } from './users.js';

app.get('/users', (req, res) => {
    res.json(users);
  });
  
  // Get a single user by ID
  app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found.');
    res.json(user);
  });
  //------------Utilize Reasonable data structure---------//
//Define data models
let users= [{ id: 1, name: 'John Doe', bookings: [] }];
let vehicles = [{ id: 1, model: 'Tesla Model S', bookings: [] }];
let bookings = [{ id: 1, userId: 1, vehicleId: 1, status: 'confirmed' }];
// used in users.js
// The "users" data will be simple information about
// the application's user base.
  