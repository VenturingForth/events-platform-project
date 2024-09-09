const express = require('express');
const app = express();
// apiRouter = require('./routes/api-router.ts');
const cors = require('cors');

app.use(cors());

app.use(express.json());

//app.use('/api', apiRouter) // Route Handling;

//Write Error Handling Below This Line

export { app };