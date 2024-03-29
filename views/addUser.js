const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Your routes and middleware

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));