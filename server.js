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

// Seed Route
app.get('/logs/seed', (req, res) => {
    // array of starter snacks
    const starterLogs = [
        { title: 'Day 1', entry: `Our first day out to sea. Hope the lads are ready. Even more I hope we find loot.`, shipIsBroken: false
        },
        { title: 'End of Day 1', entry: `Well, the lads did great. Lamb got his sea legs today and Patch found a reckage about 600 kil out. We'll reach the point tommorow morn, if we're lucky`, shipIsBroken: false
        },
        { title: 'Day 2', entry: `Seems One-Eyed Patch has better sight than we all though. We've arrive upon the reckage, no survivers, but lots of loot. Unknow where the crew went, but another's treasure is only ours to claim.`, shipIsBroken: false
        },
        { title: 'End of Day 2', entry: `We meet our first of foes today. Turns out that last crew who disapeared from the recked ship, didn't disapear at all. Their enemies became ours, and only lured us in with the 'reck'. They figured conquring two ships would me double the treasure and gold...if they only knew.`, shipIsBroken: true
        }
    ];

    Log.deleteMany({})
    .then(date => {
        Log.create(starterLogs)
            .then(data => {
                res.status(200).json(date)
            })
            .catch(error => {
                res.status(400).json(error)
            });
    })
    .catch(error => {
        res.status(400).json(error);
    });
});

/* Routes */
// Index Route
app.get('/logs', (req, res) => {
    Log.find({})
        .then(logs => {
            res.render('Index', {logs: logs})
        })
        .catch(error => {
            console.error(error);
        });
});

// New Route
app.get('/logs/new', (req, res) => {
    res.render('New');
});

// Delete Route
app.delete('/logs/:id', (req,res) => {
    Log.deleteOne({_id: req.params.id})
        .then(() => {
            res.redirect("/logs")
        })
        .catch(error => console.error(error));
});

// Update Route
app.put('/logs/:id', (req, res) => {
    console.log(req.body)
    if (req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    };
    console.log(req.body)
    Log.updateOne({ _id: req.params.id }, req.body, { new: true })
    .then(()=> res.redirect('/logs'))
    .catch(error => console.error(error));
})

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

// Edit Route
app.get('/logs/:id/edit', (req, res) => {
    Log.findOne({_id: req.params.id})
        .then(log => {
            res.render('Edit', {log: log})
        })
        .catch(error => console.error(error));
});

// Show Route
app.get('/logs/:id', (req, res) => {
    Log.findOne({_id: req.params.id})
        .then(log => {
            console.log(log)
            res.render('Show', {log: log})
        })
        .catch(error => console.error(error));
});

// Server Listener
app.listen(4000, () => console.log('Server is Listening!'))