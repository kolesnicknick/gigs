let express = require('express');
let router = express.Router();
const db = require('../../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

router.post('/add', function (req, res, next) {
    let {title, technologies, budget, description, contact_email} = req.body;
    let errors = [];

    if (!title) {
        errors.push({text: 'Please add a title'})
    }
    if (!technologies) {
        errors.push({text: 'Please add a technologies'})
    }
    if (!description) {
        errors.push({text: 'Please add a Description'})
    }
    if (!contact_email) {
        errors.push({text: 'Please add a contact email'})
    }

    //Check for errors
    if (errors.length > 0) {
        res.render('add', {errors, title, technologies, budget, description, contact_email});

    } else {
        budget = !budget ? 'Unknown' : '$' + budget;
        technologies = technologies.toLowerCase().replace(/, /g, ',');

        Gig.create({
            title,
            technologies,
            description,
            budget,
            contact_email
        }).then((gig) => {
            res.redirect('/gigs')
        })
            .catch(console.log);
    }
});

router.get('/search', (req, res) => {
    let {term} = req.query;

    term = term.toLowerCase();
    Gig.findAll({where: {technologies: {[Op.like]: `%${term}%`}}})
        .then(gigs => res.render('gigs', {gigs}))
        .catch(console.log);
});

router.delete('/:id', (req, res) => {
    Gig.destroy({where: {id: req.params.id}})
        .then(res.send({status: 'Success', message: `User with id: ${req.params.id} is deleted`}))
        .catch(console.log);
});


router.get('/edit/:id',  (req, res) => {
      Gig.findAll({where: {id: req.params.id}})
        .then(gig => {
            let {title, technologies, budget, description, contact_email} = gig[0];
            res.render('edit', {id: req.params.id, title, technologies, budget, description, contact_email});
        })
        .catch(console.log);
});

router.post('/:id', (req, res)=>{
    let {title, technologies, budget, description, contact_email} = req.body;
    Gig.update({
            title,
            technologies,
            description,
            budget,
            contact_email
        },
        {where: {id: req.params.id}})
        .then(res.send({status: 'Success', message: `User with id: ${req.params.id} is updated`}))
        .catch(console.log);
});


module.exports = router;

