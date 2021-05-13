const { json, response,request } = require('express');
const Usuario =require("../models/usuario");
const bcryptjs= require('bcryptjs')


const Autenticacion= async (req=request,res=response) =>{

        
            const {correo,password}= req.body;
               //Buscamos el usuario po el correo  
               const correoExiste=await Usuario.find({correo})
                //vemos si el correo no esta vacio
               if(!correoExiste){
                    return  res.status(400),json({
                      msg:"Correo no valido"
                      })
                    }
             
              
              res.status(200).json({
                msg:"Desde la autenticacion",
              })
                     
   


}
module.exports={
     Autenticacion

}