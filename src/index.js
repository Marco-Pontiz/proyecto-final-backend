const express = require('express');
const engine = require(`ejs-mate`);
const path = require(`path`);
const morgan = require(`morgan`);
const passport = require('passport');
const session = require('express-session');


const app = express();
require('./database.js');
require('./passport/local-auth.js')

//Setting
app.set('views', path.join(__dirname, 'views'));
app.engine(`html`, engine);
app.set(`view engine`, `html`);
app.set(`PORT`, 8080);

//middleware
app.use(morgan(`dev`));
app.use(express.urlencoded({extended: false}));
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
});