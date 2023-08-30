import { Router } from "express";

const router = Router();

import {
  mostrarProductos,
  obtenerProducto,
} from "../controllers/productosController.js";

export default function () {
  // obtener productos
  router.get("/api/:query", mostrarProductos);

  router.get("/api/items/:id", obtenerProducto);

  router.get("/", (req, res) => {
    res.send("mercado libre TEST");
  });
  router.get("/nosotros", (req, res) => {
    res.send("nosotros mercado libre TEST");
  });

  return router;
}
