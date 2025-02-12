const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors'); // Import CORS module
const path = require('path');
// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware


//-------------------------video section---------------------------------//




// MongoDB Connection
mongoose.connect('mongodb+srv://Faizal:Faizal786@faizal.atlxp5u.mongodb.net/login', {})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
const authRoutes = require('./auth/authRoutes');
app.use('/api/auth', authRoutes);



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
