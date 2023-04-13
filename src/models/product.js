const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
    nombre: String,
    descripcion: {type: String, default: 0},
    price: Number
})

module.exports = mongoose.model('Product', ProductSchema);