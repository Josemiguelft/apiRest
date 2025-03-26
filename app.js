import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./router/index.js";

// Constantes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generar el objeto principal de la aplicación
const app = express();

// Configuración de la aplicación
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Corse
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  // Manejar preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Rutas
app.use("/", router);

// Inicialización del servidor
const puerto = 8080;
app.listen(puerto, () => {
  console.log("Iniciando el servidor");
});
