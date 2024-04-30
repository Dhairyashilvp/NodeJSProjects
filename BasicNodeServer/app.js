/* eslint-disable no-console */
// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Enable CORS for all requests
app.use(cors());

app.use(bodyParser.json());
app.use('/api', userRoutes);
// Add other routes here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
