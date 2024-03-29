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
  