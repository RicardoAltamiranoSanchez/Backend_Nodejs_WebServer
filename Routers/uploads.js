//Este archivo es para subir imagenes  o archivos de cualquier tipo si
const Router =require('express');
const {check}=require('express-validator');
const {validarCampos } = require('../middleware/validacion-campos');
const {cargarArchivos, actualizarArchivo,obtenerArchivo,actualizarArchivoCloudinary}=require('../controllers/uploads');
const {colecionesPermitidas}=require('../helpers/db-validaciones');
const {validarArchivo}=require('../middleware')


const router=Router();
//Subimos un archivo nuevo 
router.post('/',validarArchivo,cargarArchivos);
//Actualizamos el archivo
//realizamos la verificacion del id y el nombre de la collecion que queremos buscar
router.put('/:coleccion/:id',[validarArchivo,
check('id','Debe ser un id de mongo').isMongoId(),
check('coleccion').custom( c => colecionesPermitidas( c, ["usuarios","productos","playeras"] )),
validarCampos],actualizarArchivoCloudinary);
 
//Obtenemos las imagenes de nuestra base de datos

router.get('/:coleccion/:id',[
    check('id','Debe ser un id de mongo').isMongoId(),
    check('coleccion').custom( c => colecionesPermitidas( c, ["usuarios","productos","playeras"] )),
    validarCampos],obtenerArchivo);





module.exports =router;
