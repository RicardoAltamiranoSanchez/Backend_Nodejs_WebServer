const {Router}=require('express');
const {check} = require('express-validator');//es pa
const {crearProducto}=require('../controllers/productos');
const{validarToken}=require('../middleware')

const router=Router();
router.get('/',(req,res) => {
   return  res.json({
       msg:'desde el get de productos',
    });

})



router.get('/:id',(res,req)=>{


 return res.status(200).json({

    msg:'desde el  get dcon el id de productos',

 })
})


router.post('/:id',[validarToken],crearProducto);
router.put('/:id',(res,req)=>{

    return res.status.json({
        msg:'desde el put de productos'
    })
})
router.delete('/:id',(res,req)=>{
   return res.status.json({
       msg:'desde delete del productos',
   })

})
//siempre debemos impprtar lo que vamos a separar
module.exports=router;