//creamos constantes para despues importadas asi tenemos un mayor control del software//
//haces destrution de response para tener los metodos pero es redund
const { response, request } = require('express');
//instanciamos la plantilla de modelos usuarios
const Usuario =require("../models/usuario");
const bcryptjs = require('bcryptjs');//este es para poder encryptar la contraeña npm i bcryptjs
const {validationResult} =require('express-validator'); //lo usamons para validar los parametros por eejmplo el email

const usuariosGet=(req=request,res=response)=>{
    const query = req.query;//obtenemos ek valor donde esta la url desde  la query
    //tambien se puede hacer destruturacion y poner valores por default ejemplo
    // const {id, nombre="no name",page, )
     
    res.status(200).json({

        msg:"Desde get",
        query
    });
}

const usuariosPut=(req=request,res=response)=>{
    const id=req.params.id;//con req.params y ponemos el nombre que pusimos en nuestra ruta
    //tambien se puede hacer destruturacion de los parametros 
    //ejemplo const {id,etc}=req.params;
  
    res.json({
       msg:"Desde de put",
      id

    });
}
const usuariosPost= async (req ,res=response) => {
    
    const errores=validationResult(req);
    if(!errores.isEmpty()){
     return res.status(400).json(errores);
     //indicamos si tiene erroes mandamos el mensaje de error
     //que ya habiamoa puesto en el check
    }
    
    //const mensaje =req.body;//es para recibir los datos desde el cliente se puede hacer destruturacion en ello
     //pero primero debes usar el middleware de express.json()
     const { nombre, correo, password, rol} = req.body;
     const usuario = new Usuario({ nombre, correo, password, rol });
     const salt = bcryptjs.genSaltSync();//encryptamos la contraseña 
     usuario.password = bcryptjs.hashSync( password, salt );//utlizamos para encryptar la contraseña 
    //validacion  de correo
    //Validacion de correo
    const existeCorreo= await Usuario.findOne({correo});//este es un a consulta buscamos si hay un correo repetido
    if(existeCorreo){

        return res.status(400).json({
             
            msg:"Este correo ya existe"
        });
    }
    
     //es un objeto usuario
     await usuario.save();
     res.json({
        msg:"Desde post",
        usuario 
    });
    console.log(Usuario)
}

const usuariosPatch=(req=request,res=response)=>{

    res.json({
        msg:"Desde patch",
    })
}
const usuariosDelete=(req=request,res=response)=>{
    //es para eliminar datos
        res.json({
            msg:"desde delete",
        });
    }
//siempre debemos impprtar lo que vamos a separar
module.exports={
   usuariosGet,
   usuariosPut,
   usuariosPost,
   usuariosPatch,
  usuariosDelete,
}