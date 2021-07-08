//es un carpeta para validaciones de la base de datos que son funciones 
//es para cortar codigo y simplificarlo  mas
const {Rol}=require("../models/rol");
const {Usuario,Categoria} =require("../models");

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
        throw new Error(`Este correo ya existe\n${correo} 
        \nIngresa uno nuevo`)
    }
}

const idExiste=async (id) => {
   
    //buscamos el objeto findById es una uncion especial de mongo para buscar id
    const existe=await Usuario.findById(id);
    //indicamos si no existe  
    if(!existe){

      throw new Error(`este id no existe ${existe}`)
      }

}
const existeCategoriaPorId = async( id ) => {
    try {
        
    // Verificar si existe categoria
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ) {
        throw new Error(`El id no existe ${ id }`);
    }
        


    } catch (error) {
     console.log(`Error en categoria la ruta de categorias ${error}`);   
    }

}
module.exports={

    rolValidacion,
    emailExiste,
    idExiste,
    existeCategoriaPorId
}