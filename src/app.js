const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db/connection');
const routes = require('./routes/ticketRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use the routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});
