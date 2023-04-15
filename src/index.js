const express = require('express');
const engine = require(`ejs-mate`);
const path = require(`path`);
const morgan = require(`morgan`);
const passport = require('passport');
const session = require('express-session');
const ejs = require('ejs')

const app = express();
require('./database.js');
require('./passport/local-auth.js')

//Setting
app.set(`PORT`, 8080);
app.engine(`html`, engine);
app.set('views', path.join(__dirname,'views'));
app.set(`view engine`, `html`);
app.set(`view engine`, `ejs`)


//middleware
app.use(morgan(`dev`));
app.use(express.urlencoded({extended: false}));
app.use(express.static('src'))
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', require('./routes/index.js'));

//Starting the server
app.listen(app.get(`PORT`), () => {
    console.log(`Server en el puerto:`, app.get(`PORT`));
    console.log(`http://localhost:8080`);
});