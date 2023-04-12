const express = require('express');
const router = express.Router();

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

router.get('/signin', (req, res, next) => {

});

router.post('/signin', (req, res, next) => {

});

router.get('/profile', (req, res, next) =>{
    res.render('profile.html');
});

module.exports = router;