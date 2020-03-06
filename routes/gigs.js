let express = require('express');
let router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gigs');

router.get('/', function(req, res, next) {
    Gig.findAll()
        .then(gigs => {
            console.log(gigs);
            res.sendStatus(200);
        })
        .catch(console.log);
});

module.exports = router;
