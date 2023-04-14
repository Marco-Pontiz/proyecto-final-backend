const express = require('express');
const router = express.Router();
const Product = require('../models/product.js')

const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('index.html')
});

router.get('/signup', (req, res, next) => {
    res.render('signup.html');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));


router.post('/api/productos', (req, res) => {
    console.log('POST /productos')
    console.log(req.body)

    let product = new Product()
    product.nombre = req.body.nombre,
    product.descripcion = req.body.descripcion,
    product.price = req.body.price
    
    product.save()
    .then(function(productStored) {
    res.status(200).send({product: productStored});
    })
    .catch(function(err) {
    res.status(500).send({message: `Error al guardar el producto ${err}`});
    });

})

router.get('/profile', (req, res, next) =>{
    res.render('profile.html');
});

module.exports = router;