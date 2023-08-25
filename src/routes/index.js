const express = require('express');

const router = express.Router();

const productosController = require('../controllers/productosController');
module.exports = function(){

  // obtener productos
  router.get('/api/:query', productosController.mostrarProductos);
  router.get('/api/items/:id', productosController.obtenerProducto);

  router.get('/', (req, res)=>{
    res.send('mercado libre TEST');
  });

  return router;
};
