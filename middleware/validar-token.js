//importampos le jsonweb token
const { response, request } = require('express')
const jwt =require('jsonwebtoken');
const Usuario =require('../models/usuario');
//los middleware siempre seran funciones de fechas se usan solo para validaciones
const validarToken= async (req=request,res=response,next) => {
        //obtnemos los headers las cabeceras  del token cuidado con poner comillas dobles marca error
    const token =  req.header('x-token');
 
    if(!token){

        return res.status(401).json({

            msg:"Token no valido"
        });
    }
    try {
        //usamos esta funcion para verificar el tojen la de veri y obtenemos el uid por que solo de dimo el uid almomento de hacer el token
        const { uid }=jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        //creamos una propiedad nueva para poder usarla en las demas plantillas
         //obtenemos el valor y en usuario.findByid buscamos por el id
         //lemmos el usuario
         const usuario = await Usuario.findById(uid);

          
          
      
        //verificamos si existe el usuario
       if(!usuario){
           return res.status(401).json({
               msg:"No existe el usuario"
           })

       }
        //verificamos si el usuario esta el false inactivo
       if(!usuario.estado){

           return res.status(401).json({
               msg:"El usuario esta false"
           })
       }
       //lo guardamos en una varible  para despues utilizarla en otras plantillas por ejemplo en la de categoria
         req.usuario=usuario;

         console.log(req.usuario);
        
    } catch (error) {
        console.log(error);

        
    }
    
    

next();
}


module.exports={
    validarToken
}