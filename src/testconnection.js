// testconnection.js
require('dotenv').config({ path: '../.env.local' });
const mongoose = require('mongoose');
const { connectionStr } = require('./app/lib/db');

mongoose.connect(connectionStr).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});
