//es un carpeta para validaciones de la base de datos que son funciones 
//es para cortar codigo y simplificarlo  mas
const {Rol}=require("../models/rol");
const {Usuario,Categoria} =require("../models");

 const rolValidacion=async (rol="")=>{ 
 try {
      const existe =await Rol.findOne({rol})// la convertimos  en una promesa de decimos que si si esta el rol
    if(!existe){//de decimos si  no existe
       throw new Error(`No paso la validacion${rol} no existe`);
    }
 } catch (error) {
     console.log(`Hubo un error en la validacion del rol en helpers ${error}`);
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
 try {

    if(!existe){

      throw new Error(`este id no existe ${existe}`)
      }

     
 } catch (error) {
     console.log(`Error en la validadcion de idExiste ${error}`);
     
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
//Realizaba la verificacion si existe la colecion que no esta indicando el usuario de
const colecionesPermitidas=  (coleccion ='',colecciones =[])=>{
    
    
    const incluida=colecciones.includes(coleccion);

    if(!incluida){
        throw new Error(`La collecion ${coleccion} no es permitida ${colecciones}`);
    }
  //debemos poner return true para que no haiga un error de hecho en todas deben de ir   
 return true;

}


module.exports={

    rolValidacion,
    emailExiste,
    idExiste,
    existeCategoriaPorId,
    colecionesPermitidas

}