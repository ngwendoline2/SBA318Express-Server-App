// Creating the simple data structures we'll work with.
// How we choose to store and organize this data is very important!
// Different options and techniques for storing data and
// creating relationships between different data sets will be
// explored during lessons on database integrations and techniques. 


//------------Utilize Reasonable data structure---------//
//Define data models
// let (users)= [{ id: 1, name: 'John Doe', bookings: [] }];
// let (vehicles) = [{ id: 1, model: 'Tesla Model S', bookings: [] }];
// let (bookings) = [{ id: 1, userId: 1, vehicleId: 1, status: 'confirmed' }];
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

module.exports = users;
