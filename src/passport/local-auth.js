const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/user.js')

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user); // Devolvemos el usuario recuperado
    } catch (error) {
        done(error);
    }
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = new User();
    user.nombre = req.body.nombre,
    user.numero = req.body.numero,
    user.email = req.body.email,
    user.password = bcrypt.hashSync(req.body.password, 10),
    await user.save();
    done(null, user);
}));
