import express, { Request, Response } from 'express';
const userRoutes = require('./routes/users')
const app = express();
const port = 8080;

app.use(express.json());

app.use('/api', userRoutes );

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
