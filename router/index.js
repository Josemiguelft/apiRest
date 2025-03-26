import express from 'express';
import { sumar, data } from '../modules/librerias.js';

const router = express.Router();

router.get('/alumnos', (req, res) => {
    res.json(data);
});

router.get('/2', (req, res) => {
    res.send('La suma es: ' + sumar(3, 4));
});

export default router;