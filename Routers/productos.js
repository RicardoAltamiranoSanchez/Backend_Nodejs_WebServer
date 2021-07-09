const {Router}=require('express');
const {validarRole,validarCampos} =require('../middleware');
const {check} = require('express-validator');//es pa
const {crearProducto,
       obtenerProductos,
       obtenerProducto,
       actualizarProducto,
      eliminarProducto
}=require('../controllers/productos');
const {existeCategoriaPorId}=require('../helpers/db-validaciones');
const{validarToken}=require('../middleware')

const router=Router();
router.get('/',obtenerProductos);

router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validarCampos
],obtenerProducto);

router.post('/:id',crearProducto);

router.put('/:id',[check('id','Esto es un id de mongo').not().isMongoId(),validarToken],actualizarProducto);

router.delete('/:id',[validarToken,validarRole],eliminarProducto);
//siempre debemos impprtar lo que vamos a separar
module.exports=router;