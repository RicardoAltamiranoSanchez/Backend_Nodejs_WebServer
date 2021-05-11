//creamos constantes para despues importadas asi tenemos un mayor control del software//
//haces destrution de response para tener los metodos pero es redund
const { response, request } = require('express');
//instanciamos la plantilla de modelos usuarios
const Usuario =require("../models/usuario");
const bcryptjs = require('bcryptjs');//este es para poder encryptar la contraeña npm i bcryptjs

const usuariosGet=(req=request,res=response)=>{
    const query = req.query;//obtenemos ek valor donde esta la url desde  la query
    //tambien se puede hacer destruturacion y poner valores por default ejemplo
    // const {id, nombre="no name",page, )
     
    res.status(200).json({

        msg:"Desde get",
        query
    });
}

const usuariosPut= async (req,res)=>{
    const {id}=req.params;//con req.params y ponemos el nombre que pusimos en nuestra ruta
    //tambien se puede hacer destruturacion de los parametros 
    //ejemplo const {id,etc}=req.params;
  
    //Actualizamos sacamos el password y el correo y dejamos el resto con destrution
    const {google,password,correo, ...resto}=req.body;
    if(password){
    const salt = bcryptjs.genSaltSync();//encryptamos la contraseña 
    //luego hay problemas cuando intentamos inicial antes una varible antes de crearla
    resto.password = bcryptjs.hashSync( password,salt  );//utlizamos para encryptar la contraseña
    }
    //Utilizamos  findByIdAndUpdate para actualizar indicamos primero el id y despues los que vamos a actulizar
    const usuario=  await Usuario.findByIdAndUpdate(id,resto);

    res.json({
       msg:"Desde de put",
      usuario

    });
}
const usuariosPost= async (req ,res=response) => {
    
    
    //const mensaje =req.body;//es para recibir los datos desde el cliente  se puede hacer destruturacion en ello
     //pero primero debes usar el middleware de express.json()
     const { nombre, correo, password, rol} = req.body;
     const usuario = new Usuario({ nombre, correo, password, rol });
     const salt = bcryptjs.genSaltSync();//encryptamos la contraseña 
     usuario.password = bcryptjs.hashSync( password, salt );//utlizamos para encryptar la contraseña 
    //validacion  de correo
   
    
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