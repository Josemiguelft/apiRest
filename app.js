import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './router/index.js';

// Constantes
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generar el objeto principal de la aplicación
const app = express();

// Configuración de la aplicación
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', router);

// Inicialización del servidor
const puerto = process.env.PORT || 3000;
app.listen(puerto, () => {
    console.log(`Servidor iniciado en http://localhost:${puerto}`);
});