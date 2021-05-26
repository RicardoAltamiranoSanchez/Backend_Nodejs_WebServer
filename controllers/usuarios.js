//creamos constantes para despues importadas asi tenemos un mayor control del software//
//haces destrution de response para tener los metodos pero es redund
const { response, request } = require('express');
//instanciamos la plantilla de modelos usuarios
const Usuario =require("../models/usuario");
const bcryptjs = require('bcryptjs');//este es para poder encryptar la contraeña npm i bcryptjs

const usuariosGet= async (req=request,res=response)=>{
    //const query = req.query;//obtenemos ek valor donde esta la url desde  la query
    const{ limite=2,desde=0}=req.query;//hacemos destrution para obtener el valor de limtes
    //tambien se puede hacer destruturacion y poner valores por default ejemplo
    // const {id, nombre="no name",page, )
     //obtenemos todos los usuarios
    /* const usuarios= await Usuario.find()
     .limit(Number(limite))//utilizamos limit igual que una basw de datso y lo convertimos enm numero;
     .skip(Number(desde));//Inidicamos desde donde queremosn empezar
     
     //para ver cuanto usuarios tenemos
     const total =await Usuario.countDocuments();
     *///en promise.all nos permite manda un arreglo con todas las promesas
     //que quiero que se ejecuten   
     //hacemos un query para obtener los valores activos 
     const query ={estado:true}
     const [total,usuarios]= await Promise.all([
         //ponemos lo que quereoms obtener
         Usuario.countDocuments(query),
        Usuario.find(query)
        .limit(Number(limite))
        .skip(Number(desde))
     ]);
    /*res.status(200).json({
      total,
      usuarios
    });*/
    res.status(200).json({
        total,
        usuarios
    });

}

const usuariosPut= async (req,res)=>{
    const {id}=req.params;//con req.params y ponemos el nombre que pusimos en nuestra ruta
    //tambien se puede hacer destruturacion de los parametros 
    //ejemplo const {id,etc}=req.params;
  
    //Actualizamos sacamos el password y el correo y dejamos el resto con destrution
    const { _id , google , password , correo , ...resto}=req.body;
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
        msg:"Su registro fue hecho correctamente",
        usuario 
    });
    console.log(Usuario)
}

const usuariosPatch=(req=request,res=response)=>{

    res.json({
        msg:"Desde patch",
    })
}
const usuariosDelete=async (req=request,res=response)=>{
    //para eliminar usuario fisicamente pero no es conveniente por que se pierde
    //despues lo que hizo
    const {id} =req.params;
    //creamos una variable para obtener el uid que inicializamos en el validar -token
    const uid=req.uid
   // const usuario=await Usuario.findByIdAndDelete(id);
    //es para eliminar datos
    //Eliminar usuaruio sin eliminar 
    const usuario =await Usuario.findByIdAndUpdate(id,{estado:false})
    
    //en req no lo obtenemos desde el validar token 
    const usuarioAutenticado=req.usuario;
    //ponemos primero el id donde lo va buscar y luego decimos que va modificar
    res.json({
            msg:"Usuario eliminado",
            usuario,
            uid,
            usuarioAutenticado
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