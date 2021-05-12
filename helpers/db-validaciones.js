//es un carpeta para validaciones de la base de datos que son funciones 
//es para cortar codigo y simplificarlo  mas
const {Rol}=require("../models/rol");
const Usuario =require("../models/usuario");

 const rolValidacion=async (rol="")=>{ 
    const existe =await Rol.findOne({rol})// la convertimos  en una promesa de decimos que si si esta el rol
    if(!existe){//de decimos si  no existe
       throw new Error(`No paso la validacion${rol} no existe`);
    }
}
//Validacion de correo
const emailExiste = async(correo="") => {

    const existe= await Usuario.findOne({correo});
    if(existe){
        throw new Error(`Este correo ya existe${correo}`)
    }
}

const idExiste=async (id) => {
   
    //buscamos el objeto findById es una funcion especial de mongo para buscar id
    const existe=await Usuario.findById(id);
    //indicamos si no existe  
    if(!existe){

      throw new Error(`este id no existe ${existe}`)
      }

}
module.exports={

    rolValidacion,
    emailExiste,
    idExiste
}