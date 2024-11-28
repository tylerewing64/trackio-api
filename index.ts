import express, { Request, Response } from 'express';
const userRoutes = require('./routes/users')
const applicationRoutes = require('./routes/applications')
const app = express();
const port = 8080;
const cors = require('cors');
const serverless = require("serverless-http");

app.use(express.json());
app.use(cors());
app.use('/api', userRoutes );
app.use('/api', applicationRoutes );


app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
module.exports.handler = serverless(app);