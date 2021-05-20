const { response,request } = require('express');
const Usuario =require("../models/usuario");
const bcryptjs= require('bcryptjs');
const {generarToken}=require('../helpers/token');
const { validarToken } = require('../middleware/validar-token');
const {verificacionGoogle} = require('../helpers/google-verificacion')

const login = async(req, res = response) => {
     //hacemos una destruturacion obtenemos solo los campos que queremos
    const { correo, password } = req.body;
   //ponemos un try por si hay errores
    try {
      
        // Verificar si el email existe
        //importante poner one y no para buscar solo uno
        //aveces uno se confunde
        const usuario = await Usuario.findOne({ correo });
        //de decimos si esta vacio
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // SI el usuario está activo
        //preguntamos si el estado esta esta el false eso quiero decir 
        //que esta elimindao para los demas nosotros lo ponemos para no peder
        //su informacion
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        // compareSybc es una funcion de brcypts que compara las dos constrasenia
        //
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
      //verificar bien los nombres utilizamos el generar token del helpers 
      const token = await generarToken( usuario.id );
       res.status(200).json({
             usuario,  
             token
       });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   

}
//Verificar la autehnticacion de google
const googleSingin = async(req,res=response) =>{
            //obtenemos el token desde el body
              const {id_token}=req.body;
                //hacemos un try catch por si hay errores
              try {
                  //hacemos destrution para solo obtener los valores que requerimos y enviamos el token 
                  //ala funcion de verificar que esta en el helpers 
                const {nombre,img,correo}= await  verificacionGoogle(id_token);
                //buscamos al usuario por el findOne por el correo si existe 
                let usuario=await Usuario.findOne({correo});
                //si no existe guardamos su informacion en un nuevo registro
                if(!usuario){
                  //creamos un objeto para crear la nueva informacion propeniente de google solo llenamos los campos que no falten
                    const data={
                        nombre,
                        correo,
                        img,
                        password:'google',
                        google:'true'
                    }
                    //guardamos el usuario en la base de datos
                    return  usuario= new Usuario(data);
                    await usuario.save();
                }
              //si el usuario esta eliminado es decir que si existe pero su estado es false lo bloqueamos
                if(!usuario.estado){
                    return res.status(400).json({
                    msg:"Usuario bloqueado"

                    })
                }


                
                     //verificar bien los nombres utilizamos el generar token del helpers 
                     const token = await generarToken( usuario.id );
                         
                    res.status(200).json({
                        msg:'Token valido de google',
                        usuario,
                        token
                        
                     })
                
                


                  
              } catch (error) {

                console.log(error);
                res.status(401).json({

                    msg:'Token no reconocido'
                })  
              }
}
module.exports = {
    login,
    googleSingin
}