// Dependencies
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const Log = require('./models/Logs')

// Database Connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI,  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

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

// Create Route
app.post('/logs', (req, res) => {
    if (req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    };

    Log.create(req.body)
        .then(addedLog => {
            res.redirect('/logs');
        })
        .catch(error => {
            console.error(error);
        });
});

// Server Listener
app.listen(4000, () => console.log('Server is Listening!'))