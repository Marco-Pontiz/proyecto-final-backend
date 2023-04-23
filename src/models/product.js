const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    nombre: {type: String},
    descripcion: {type: String},
    price: {type: Number}
})

module.exports = mongoose.model('Product', ProductSchema);