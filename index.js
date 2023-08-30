// Importamos los módulos necesarios
import express from "express";
import routes from "./src/routes/index.js";
import cors from "cors";

// Creamos una instancia de la aplicación Express
const app = express();

// Configuramos las rutas de la aplicación
app.use("/", routes());

// Configuramos el middleware de CORS para permitir solicitudes de diferentes dominios
app.use(cors());

// Definimos el puerto en el que la aplicación escuchará las solicitudes
const PORT = process.env.PORT || 4000;

// Iniciamos el servidor y lo ponemos a la escucha en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
