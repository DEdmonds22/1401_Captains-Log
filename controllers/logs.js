const express = require('express');
const Log = require('../models/Logs');
const router = express.Router();

// Routes
// Index Route
router.get('', (req, res) => {
    Log.find({})
        .then(logs => {
            res.render('Index', {logs: logs})
        })
        .catch(error => {
            console.error(error);
        });
});

// New Route
router.get('/new', (req, res) => {
    res.render('New');
});

// Delete Route
router.delete('/:id', (req,res) => {
    Log.deleteOne({_id: req.params.id})
        .then(() => {
            res.redirect('/')
        })
        .catch(error => console.error(error));
});

// Update Route
router.put('/:id', (req, res) => {
    console.log(req.body)
    if (req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    };
    console.log(req.body)
    Log.updateOne({ _id: req.params.id }, req.body, { new: true })
    .then(()=> res.redirect(''))
    .catch(error => console.error(error));
})

// Create Route
router.post('/', (req, res) => {
    if (req.body.shipIsBroken === 'on'){
        req.body.shipIsBroken = true;
    } else {
        req.body.shipIsBroken = false;
    };

    Log.create(req.body)
        .then(addedLog => {
            res.redirect('/');
        })
        .catch(error => {
            console.error(error);
        });
});

// Edit Route
router.get('/:id/edit', (req, res) => {
    Log.findOne({_id: req.params.id})
        .then(log => {
            res.render('Edit', {log: log})
        })
        .catch(error => console.error(error));
});

// Show Route
router.get('/:id', (req, res) => {
    Log.findOne({_id: req.params.id})
        .then(log => {
            console.log(log)
            res.render('Show', {log: log})
        })
        .catch(error => console.error(error));
});

// Seed Route
router.get('/seed', (req, res) => {
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

module.exports = router;