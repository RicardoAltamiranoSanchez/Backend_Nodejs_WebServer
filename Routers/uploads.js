//Este archivo es para subir imagenes  o archivos de cualquier tipo si
const Router =require('express');
const {check}=require('express-validator');
const {validarCampos } = require('../middleware/validacion-campos');
const {cargarArchivos}=require('../controllers/uploads');


const router=Router();

router.post('/',cargarArchivos);




module.exports =router;
