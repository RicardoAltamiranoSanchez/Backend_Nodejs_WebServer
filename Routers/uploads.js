//Este archivo es para subir imagenes  o archivos de cualquier tipo si
const Router =require('express');
const {check}=require('express-validator');
const {validarCampos } = require('../middleware/validacion-campos');
const {cargarArchivos, actualizarArchivo}=require('../controllers/uploads');
const {collecionesPermitidas}=require('../helpers/db-validaciones');


const router=Router();

router.post('/',cargarArchivos);
//Actualizamos el archivo
router.put('/:colecion/:id',[
check('id','Debe ser un id de mongo').isMongoId(),
check('coleccion').custom( colecion => collecionesPermitidas( colecion, ["usuarios","productos"] )),
validarCampos],actualizarArchivo);






module.exports =router;
