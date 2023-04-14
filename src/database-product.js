const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/mi-base-de-datos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Definir el modelo de producto
const productoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    price: Number,
});

const Producto = mongoose.model('Producto', productoSchema);

// Configurar el servidor
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Manejar la solicitud de creación de nuevos productos
app.post('/productos', async (req, res) => {
    const { nombre, descripcion, price } = req.body;

    try {
    // Crear un nuevo producto
    const producto = new Producto({
        nombre,
        descripcion,
        price,
    });

    // Guardar el producto en la base de datos
    await producto.save();

    // Redirigir a la página principal
    res.redirect('/');
} catch (error) {
    console.error(error);
    res.status(500).send('Ha ocurrido un error');
}
});