//creamos constantes para despues importadas asi tenemos un mayor control del software//
//haces destrution de response para tener los metodos pero es redund
const { response, request } = require('express');
//instanciamos la plantilla de modelos usuarios
const Usuario =require("../models/usuario");
const bcryptjs = require('bcryptjs');//este es para poder encryptar la contraeña npm i bcryptjs

const usuariosGet= async (req=request,res=response)=>{
    //const query = req.query;//obtenemos ek valor donde esta la url desde  la query
    try {
        
    
    const{ limite,desde=0}=req.query;//hacemos destrution para obtener el valor de limtes
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
} catch (error) {
        console.log(`Hubo un error al momento de obtener la informacion de los usuarios${error}`);
}

}

const usuariosPut= async (req,res)=>{
      try {
          
    const {id}=req.params;//con req.params y ponemos el nombre que pusimos en nuestra ruta
    //tambien se puede hacer destruturacion de los parametros 
    //ejemplo const {id,etc}=req.params;
   
    //Actualizamos sacamos el password y el correo y dejamos el resto con destrution
    //const { _id , google , password , correo , ...resto}=req.body;
    const {_id,google, password,...resto}=req.body;
    console.log(req.body);
    if(password){
    const salt = bcryptjs.genSaltSync();//encryptamos la contraseña 
    //luego hay problemas cuando intentamos inicial antes una varible antes de crearla
    resto.password = bcryptjs.hashSync( password,salt  );//utlizamos para encryptar la contraseña
    }
    //Utilizamos  findByIdAndUpdate para actualizar indicamos primero el id y despues los que vamos a actulizar
    const usuario=  await Usuario.findByIdAndUpdate(id,resto);
    

    return res.status(200).json({
       msg:"Actualizacion Existosa"

    });




      } catch (error) {
        return res.status(500).json({
      msg:"Error al actualizar nuevo registro, contactese con el administrador"

    });

      
      }


}
const usuariosPost= async (req ,res=response) => {
    try {
        
    //const mensaje =req.body;//es para recibir los datos desde el cliente  se puede hacer destruturacion en ello
     //pero primero debes usar el middleware de express.json()
    
     const { nombre, correo, password, rol,descripcion} = req.body;
     console.log(req.body);
     console.log(`Aqui desde antes de registrarse el usuario en body ${req.body}`);
 
     const usuario = new Usuario({nombre,correo, password,rol,descripcion});
     console.log(usuario);
     const salt = bcryptjs.genSaltSync();//encryptamos la contraseña 
     usuario.password = bcryptjs.hashSync( password, salt );//utlizamos para encryptar la contraseña 
    //validacion  de correo
   
    
     //es un objeto usuario
     await usuario.save();
     return res.status(200).json({
        msg:"Su registro fue hecho correctamente",
        usuario 
    })
     console.log(Usuario)
        
    } catch (error) {
        return res.status(401).json({

        msg:`Hubo un error inesperado ${error}consulte con el admimistrador`,

        })
        
    }    
}

const usuariosPatch=(req=request,res=response)=>{

    res.json({
        msg:"Desde patch",
    })
}
const usuariosDelete=async (req=request,res=response)=>{
   
   try {
       
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
     return res.status(200).json({
            msg:`Usuario Eliminado ${usuario._id}<br>${usuario.nombre}`,
            usuario,
            uid,
            usuarioAutenticado
        });
    }
catch (error) {
    return res.status(401).json({

        msg: `Puto Error ${error}`
    })   
   
}
}

//siempre debemos impprtar lo que vamos a separar
module.exports={
   usuariosGet,
   usuariosPut,
   usuariosPost,
   usuariosPatch,
  usuariosDelete,
}