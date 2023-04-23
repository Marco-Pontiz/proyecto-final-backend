const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { mongodb } = require('./keys');

// Conectar a la base de datos
mongoose.connect(mongodb.URI_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Definir el modelo de producto
const productoSchema = new mongoose.Schema({
    nombre: {type: String},
    descripcion: {type: String},
    price: {type: Number},
});

const Producto = mongoose.model('Productos', productoSchema);

module.exports = Producto;

// Manejar la solicitud de creación de nuevos productos
// app.post('/productos', async (req, res) => {
//     const { nombre, descripcion, price } = req.body;
//     console.log("ENTRO AL POST DE PRODUCTOS")
//     try {
//     // Crear un nuevo producto
//     const producto = new Producto(
//         nombre,
//         descripcion,
//         price,
//     );

//     console.log(producto);

//     // Guardar el producto en la base de datos
//     await producto.save();

//     // Redirigir a la página principal
//     res.redirect('/');
// } catch (error) {
//     console.error(error);
//     res.status(500).send('Ha ocurrido un error');
// }
// });