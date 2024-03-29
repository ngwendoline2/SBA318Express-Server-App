Creating a basic transportation agency server application with Node.js and Express involves several steps, including setting up the project, creating a RESTful API, implementing middleware, using a template engine, and handling form submissions.We add some endpoints to manage transportation data, like buses or routes. With the body-parser middleware set up, my Express app can now parse the body of incoming requests. The POST endpoint /api/routes defined earlier will handle form submissions. We used node server.js to start my server. 
Visit http://localhost:3000 in browser to view the form. We will create two custom middleware functions: Logger Middleware: To log details of each request.Authentication Middleware: To simulate a simple authentication mechanism, The  authentication middleware checks for a specific header (X-Auth-Token) and value (secret-token). If the token matches, it proceeds to the next middleware or route handler; otherwise, it returns a 403 Unauthorized response. We use the /protected route without the X-Auth-Token header to observe the Unauthorized response. Use a tool like Postman to set the X-Auth-Token header to secret-token and access the /protected route again. This time, we should gain access. middleware will catch any errors that are passed to the next() function within the application and respond with a 500 Internal Server Error status, indicating that something went wrong on the server. The error-handling middleware can be customized to handle different types of errors differently. For example, you can modify the middleware to return a JSON response with more error details or to handle specific error types in a certain way: We  updated server.js with the following content to include error-handling middleware and routes for Users, Vehicles, and Bookings
The example includes a simple error-handling middleware that logs the error stack and sends a generic "Something broke!" message to the client. Additionally, there's a handler for 404 - Not Found errors for unmatched routes. We test our API endpoints using Postman or curl
To list all users: GET http://localhost:3000/users
To create a new user: POST http://localhost:3000/users with a JSON body like { "name": "Jane Doe" }
To list all vehicles: GET http://localhost:3000/vehicles
To create a new vehicle: POST http://localhost:3000/vehicles with a JSON body like { "model": "Audi Q5" }
To list all bookings: GET http://localhost:3000/bookings
To create a new booking: POST http://localhost:3000/bookings with a JSON body like { "userId": 1, "vehicleId": 1 }
We need to define our data models more precisely,in this structure, both users and vehicles have a bookings array that can hold the IDs of bookings related to them. This change will make it easier to query related bookings for each user and vehicle.
Extract User ID: The user ID is pulled from the URL parameter.
Find User: It searches for the user in the users array by ID.
User Not Found: If the user doesn't exist, a 404 status code with an error message is returned.
Delete User: The user is removed from the users array using splice().
Confirm Deletion: The server sends back the deleted user's data as a confirmation of the action.

Here's my project structure overview

transportation-agency/
│
├── node_modules/              # Node.js modules
├── public/                    # Static files (CSS, JS, images)
│   └── css/
│       └── style.css
├── src/
│   ├── controllers/           # Route controllers (controller layer)
│   │   ├── usersController.js
│   │   └── vehiclesController.js
│   ├── middleware/            # Custom middleware
│   │   ├── errorHandler.js
│   │   └── logger.js
│   ├── models/                # Data models (schema definitions)
│   │   ├── user.js
│   │   └── vehicle.js
│   ├── routes/                # Route definitions
│   │   ├── index.js
│   │   ├── users.js
│   │   └── vehicles.js
│   ├── views/                 # Templates / views
│   │   ├── index.ejs
│   │   ├── users.ejs
│   │   └── vehicles.ejs
│   └── app.js                 # App entry point
├── .env                       # Environment variables
├── package.json
└── package-lock.json