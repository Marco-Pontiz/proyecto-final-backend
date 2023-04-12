const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user.js')

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    await User.findById(id)
    done(null, user);
})

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
}); 

passport.use('local-signup', new LocalStrategy({
    nombreField: 'nombre',
    numeroField: 'numero',
    emailField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, nombre, numero, email, password, done) => {
    const user = new User();
    user.nombre = nombre,
    user.numero = numero,
    user.email = email,
    user.password = password,
    await user.save();
    done(null, user);
}));
