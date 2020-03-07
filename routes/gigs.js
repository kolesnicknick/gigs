let express = require('express');
let router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');

router.get('/', function (req, res, next) {
    Gig.findAll()
        .then(gigs => {
            console.log(gigs);
            res.render('gigs', {
                gigs,
            });
        })
        .catch(console.log);
});


router.get('/add', (req, res) => {
    res.render('add')
});

//Add a gig
router.post('/add', function (req, res, next) {
    const data = {
        title: 'Looking for a Full Stack developer',
        technologies: 'HTML, CSS, JS, REACT, NODE',
        budget: '$3500',
        description: 'NEED JS DEVELOPER ASAP WITH NODE+REACT KNOWLEDGE',
        contact_email: 'user2@gmail.com'
    };

    let {title, technologies, budget, description, contact_email} = data;

    //Insert data to base
    Gig.create({
        title,
        technologies,
        description,
        budget,
        contact_email
    })
        .then((gig) => {
            res.redirect('/gigs')
        })
        .catch((err) => {
            console.log(err)
        });
});
module.exports = router;
