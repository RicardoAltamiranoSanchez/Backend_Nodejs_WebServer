const {response}=require('express');
const {Categoria,Usuario} =require('../models');


const agregarCategoria=async (req,res=response)=>{

try {
    
    //solo obtenemos el nombre y lo convertimos en mayuscula para que cuando hagamos la busqueda sea mas facil
    const nombre =req.body.nombre.toUpperCase();
    //creamos una variable con el nombre de categoria y buscamos en la bd de categoria por el nombre aver si existe
    const categoriadb=await Categoria.findOne({nombre});
     
   //si existe ya la categoria respondemos un mensaje que si existe
    if(categoriadb){
     

      return res.status(400).json({
          msg:`La categoria  ${categoriadb.nombre} ya existe`
      })
       }
    //sin no existe creamos una data con el nombre del usuario que esta ingresando el registro
    //y obtenenmops el id del usuario 

    const data={
        nombre,
        usuario:req.usuario._id

    }
       //Creamos un nuevo objeto de categoria con la informacion del dat y despues lo guardamos y respodemos un status de creacion de 201
      const categoria=new Categoria(data);
      await categoria.save();
    
     return res.status(201).json({
      categoria
    })

} catch (error) {
     console.log(error);    
}


}

const obtenerCategorias = async (req,res=response)=>{
     
     
    try {
        
     const {limite=10,desde=0}=req.query;
     const query={estado:true}
     const [total,categoria]=await Promise.all([
                    Categoria.countDocuments(),
                    Categoria.find(query)
                    .limit(Number(limite))
                    .skip(Number(desde)) 
                ]);
                  
      return res.status(200).json({
          msg:`Total de categorias  existentes ${total}`,
          categoria
         })


    } catch (error) {
     console.log(`Ocurrio un error ${error}`);       
    }




}
const obtenerCategoria=async (req,res=response) => {

     


    try {
        const {id}=req.query;
        const categoria=await Categoria.findById({id});
        return   res.status(200).json({
            msg:`Categoria seleccionada` ,
            categoria
        })
        
    } catch (error) {
        console.log(`Ocurrio un error ${error}`)
        
    }
}


module.exports={
    agregarCategoria,
    obtenerCategorias,
    obtenerCategoria
}