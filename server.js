// Dependencies
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// Create App Object
const app = express();
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx');

// Register Middleware
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));

// Test Route
app.get('/', (req, res) => {
    res.send('Tester Route');
});

/* Routes */
// New Route
app.get('/logs/new', (req, res) => {
    res.render('New');
});

// Server Listener
app.listen(4000, () => console.log('Server is Listening!'))