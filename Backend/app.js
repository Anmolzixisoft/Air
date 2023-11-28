const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const route = require('./routes/api.routes');
dotenv.config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV || 'development'}`)
});

const app = express();

// Connect to MongoDB without useNewUrlParser and useUnifiedTopology options
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));

// Other middleware and routes setup
app.use(cors());
app.use(route);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
