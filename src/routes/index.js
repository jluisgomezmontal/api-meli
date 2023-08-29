const express = require("express");

const router = express.Router();

const productosController = require("../controllers/productosController");

module.exports = function () {
  // obtener productos
  router.get("api/products", productosController.mostrarProductos);

  router.get("api/items/:id", productosController.obtenerProducto);

  router.get("/", (req, res) => {
    res.send("mercado libre TEST");
  });
  router.get("/nosotros", (req, res) => {
    res.send("nosotros mercado libre TEST");
  });

  return router;
};
