const {Router} =require('express');
const {check} = require('express-validator');//es para hacer validaciones npm i express-validator
const {

    validarCampos,
    validarToken,
    tieneRol

}=require('../middleware')

const {rolValidacion,emailExiste,idExiste}=require('../helpers/db-validaciones');


const router =Router();
//obtenenoms toodos los usuarios de la base de  datos -pubicas
router.get('/',(req,res)=>{
    res.json({
        msg:"Desde el get"
    })

});
//Obtenemos solo un id especivico -publico
router.get('/:id',(req,res)=>{
    res.json({
        msg:"Desde el segundo get"
    })
})
//Crear  categoria -privado cualquier persona con token valido
router.post('/:id',(req,res)=>{

    res.json({
        msg:"Desde el post"
    })
})
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
