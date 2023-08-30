// Importamos el módulo Router de Express para crear un enrutador
import { Router } from "express";
// Importamos los controladores necesarios desde el archivo "productosController.js"
import {
  mostrarProductos,
  obtenerProducto,
} from "../controllers/productosController.js";

// Creamos una instancia del enrutador
const router = Router();

// Definimos las rutas y las asociamos con los controladores correspondientes
// Endpoint para mostrar una lista de productos según un criterio de búsqueda
router.get("/api/:query", mostrarProductos);

// Endpoint para obtener información detallada de un producto por su ID
router.get("/api/items/:id", obtenerProducto);

// Ruta de inicio
router.get("/", (req, res) => {
  res.send("mercado libre TEST");
});

// Ruta "nosotros"
router.get("/nosotros", (req, res) => {
  res.send("nosotros mercado libre TEST");
});

// Exportamos una función que devuelve el enrutador configurado
export default function () {
  return router;
}
