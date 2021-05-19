const { response,request } = require('express');
const Usuario =require("../models/usuario");
const bcryptjs= require('bcryptjs');
const {generarToken}=require('../helpers/token');
const { validarToken } = require('../middleware/validar-token');

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


module.exports = {
    login
}