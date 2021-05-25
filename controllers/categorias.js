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
        //el req.paramas es mas para el id o el headers y el query es cuando pones el nombre en los headers se hace una destrutration o como se llame se pone corchetes
        const {id}=req.params;
        console.log(id);
        //para usar el objetid en una busqueda se pone sin llaves
        const categoria=await Categoria.findById(id)
                              .populate('usuario','nombre');//el populate es una funcion de moongose te da los valores que pidas

        return   res.status(200).json({
            msg:`Categoria seleccionada` ,
            categoria
        })
        
    } catch (error) {
        console.log(`Ocurrio un error ${error}`)
        
    }
}


const actualizarCategoria= async (req,res=response) => {
           
    try {
        //se debe poner el destrution no una variable por que sale errores importante
        const {id}=req.params;
           console.log(id);
           const {estado,usuario ,...resto}=req.body;
           if(resto.nombre){
            resto.nombre=resto.nombre.toUpperCase()
           }

           resto.usuario=req.usuario._id;
           //el new:true es para que mande siempre el nuevo documento actualizado
           const categoria=  await Categoria.findByIdAndUpdate(id,resto,{new:true});          
           return res.status(200).json({
          msg:"Actualizacion lista",
          categoria

        })

    
        
    } catch (error) {
        console.log(`hubo un error ${error}`)
        
    }
      
          
}
const borrarCategoria=async (req,res=response)=>{

//obtenemos el valor en el header 
    const {id}=req.params;
    //lo eliminamos en false 
    const query={estado:false
    };
    const categoria=await Categoria.findByIdAndUpdate(id,query,{new:true});
    return res.status(201).json({

        msg:"Categoria eliminada",
        categoria
    }) 


}
module.exports={
    agregarCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}