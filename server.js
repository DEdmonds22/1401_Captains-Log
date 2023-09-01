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

// Routes
app.use('/logs', require('./controllers/logs'));

// Server Listener
app.listen(4000, () => console.log('Server is Listening!'))