const {Router} =require('express');
const {check} = require('express-validator');//es para hacer validaciones npm i express-validator
const {

    validarCampos,
    validarToken,
    tieneRol

}=require('../middleware');

const {rolValidacion,emailExiste,idExiste}=require('../helpers/db-validaciones');
const {agregarCategoria,obtenerCategorias,obtenerCategoria}=require('../controllers/categorias');


const router =Router();
//obtenenoms toodos los usuarios de la base de  datos -publicas
router.get('/',obtenerCategorias);
//Obtenemos solo un id especivico -publico
router.get('/:id',obtenerCategoria);
//Crear  categoria -privado cualquier persona con token valido
router.post('/',[validarToken,
  check('nombre',"Es obligatorio el nombre").not().isEmpty(),validarCampos],agregarCategoria
)
//Actualizar -publico- conquier es toke valido
router.put('/:id',(req,res)=>{
    res.json({
        mgs:"Desde el put"
    })
})
//Eliminar solo si es admi para poder hacer
router.delete('/:id',(req,res)=>{
     res.json({
         msg:"Desde el delete"
     })
})

module.exports=router;
 