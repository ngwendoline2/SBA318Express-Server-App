//-------------Create and Using Middleware---------------//
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
  }
  
  // Use the middleware
  app.use(logger);

//--------------Implement the Server and Middleware--------------//
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Sorry, can’t find that!');
});