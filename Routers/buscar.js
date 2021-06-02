const {Router}=require('express');

const {buscar}= require('../controllers/buscar');

const router = Router();
//Es una ruta para buscar para diferentes tipos de consultar
//Cada valor se pone con un id y va separado por diagonales y dos puntos
router.get('/:collection/:termino',buscar); 
module.exports =router;