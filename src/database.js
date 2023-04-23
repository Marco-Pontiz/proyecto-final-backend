const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.connect(mongodb.URI_ATLAS, {useNewUrlParser: true}) //Si pones mongodb.URI (Muestra los productos en "/productos" y "/carrito")
    .then(db => console.log('La base de datos esta conectada'))
    .catch(err => console.error(err));