const express = require('express');
const router = express.Router();
// const Product = require('../models/product.js');
const path = require('path');
const main = require("../correo.js");
const Product = require("../database-product.js");

const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('index.hbs')
});

router.get('/signup', (req, res, next) => {
    res.render('signup.hbs');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));


router.post('/productos', async (req, res) => {
    try {
        const getProducto = req.body;
        
        let newProduct = new Product({
            nombre: getProducto.nombre,
            descripcion: getProducto.descripcion,
            price: getProducto.price
        });

        await newProduct.save();

        console.log(newProduct);

        
    }

    catch (err) {
        console.log(err);
    }

    // let product = new Product()
    // product.nombre = req.body.nombre,
    // product.descripcion = req.body.descripcion,
    // product.price = req.body.price
    
    // await product.save()
    // .then(function(productStored) {
    // res.status(200).send({product: productStored});
    // })
    // .catch(function(err) {
    // res.status(500).send({message: `Error al guardar el producto ${err}`});
    // });

})

router.get("/productos", async(req, res) => {
    try{
        //Obtener todos los productos de la base de datos
        const productos = await Product.find();
        console.log(productos)

        //Renderiza la vista previa en HTML con los datos de los productos
        res.render('product', {
            data: {
                nombre: productos.map(product => [product.nombre]),
                descripcion: productos.map(product => [product.descripcion]),
                price: productos.map(product => [product.price])
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error')
    }
});

router.post('/carrito', (req, res) => {
    console.log('POST /carrito')
    console.log(req.body)

    main();

    let product = new Product()
    product.nombre = req.body.nombre,
    product.descripcion = req.body.descripcion,
    product.price = req.body.price
    
    product.save()
    .then(function(productStored) {
    res.status(200).send({product: productStored});
    })
    .catch(function(err) {
    res.status(500).send({message: `Error al guardar el producto ${err}`});
    });

})


router.get("/carrito", async(req, res) => {
    try{
        const productos = await Product.find();
        console.log(productos)

        res.render('cart', {
            data: {
                nombre: productos.map(product => [product.nombre]),
                descripcion: productos.map(product => [product.descripcion]),
                price: productos.map(product => [product.price])
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error')
    }
});


router.get('/profile', (req, res, next) =>{
    res.render('profile.hbs');
});

module.exports = router;