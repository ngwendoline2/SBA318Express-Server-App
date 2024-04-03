import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
bodyParser.config();

const client = new MongoClient(process.env.MONGO_URI);

let conn;
try {
    conn = await client.connect();
    console.log('connected')
} catch (e) {
    console.error(e);
}


//------------Utilize Reasonable data structure---------//
//Define data models
// let users = [{ id: 1, name: 'John Doe', bookings: [] }];
// let vehicles = [{ id: 1, model: 'Tesla Model S', bookings: [] }];
// let bookings = [{ id: 1, userId: 1, vehicleId: 1, status: 'confirmed' }];
// used in users.js
// The "users" data will be simple information about
// the application's user base.
  
// Sample initial data
let users = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
let vehicles = [{ id: 1, model: 'Tesla Model S', year: 2020 }];
let bookings = [{ id: 1, userId: 1, vehicleId: 1, date: '2024-03-25' }];
 //-----------create POST routes for data---------//
 app.use(express.json()); // Middleware to parse JSON bodies
 app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
 
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

 //-----------create POST routes for data---------//
 app.use(express.json()); // Middleware to parse JSON bodies
 app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
 
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
// we are accessing database in the mongoDB compass sample data
let db = conn.db("Transportation Agency");

export default db;