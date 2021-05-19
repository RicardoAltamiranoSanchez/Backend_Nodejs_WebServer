const {request,response}=require('express');


const validarRole=  (req=request,res=response,next)=>{

   //validamos el token con el req.usuario que hicimos en validar token ya que se ejecuta primero
      if(!req.usuario){
          return res.status(500).json({
          
              msg:"Aun no haz validio el token"
          
          })
      }
      //hacemo sun destruction para obtner el valor del rol y comparar si es el miso que un administrador
      const {rol,nombre}=req.usuario;
      if(!rol==='SUPER_USER') 
        {
            return res.status(401).json({

                msg:"No es super usuario para ejecutar esta funcion"
            })

        }


   next();     

}
// hacemos una hacemo una destrution lo que hacemo es que todos los valores lo guardarmos para despues verificarlos
const tieneRol = (...roles)=>{
    //esto es para poder obtener valores desde afuera de middleware
    return (req=request,res=response,next)=>{
            if(!req.usuario){
             return res.status(500).json({
                 msg:"Aun no haz validado el token"
               })
               }
            if(!req.include(req.usario.rol)){

                return res.status(401).json({
                    msg:`Debe ser unos de estos roles ${roles}`
                })
            }     
            next();
             }

         
            }


module.exports={
    validarRole,
    tieneRol

}