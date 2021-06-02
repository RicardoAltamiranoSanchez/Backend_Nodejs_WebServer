const {response}=require('express');
const {ObjectId } =require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const colleciones=[
      'usuarios',
      'productos',
      'categorias',
      'roles'
]

 const buscarUsuario=async (termino ='',res=response) => {


             try {
                  //verificamos si es id de mongo nos devuelve un valor booleano 
             const mongoId=ObjectId.isValid(termino);
             if(mongoId){
                 const usuario=await Usuario.findById(termino);
                 return res.status(200).json({
                    results: ( usuario ) ? [ usuario ] : []
                });
                }
               //es una expresion regular ya viene preteminada por javascript (REgExp) la i de decimos que sea indiferente alas mayusculas y minusculas n 
                const regex = new RegExp( termino, 'i' );
                const usuarios = await Usuario.find({
                    //utilizamos comandos de mongo preguntamos si es nomobre o es correo
                    $or: [{ nombre: regex }, { correo: regex }],
                    //y que se su estado este activo
                    $and: [{ estado: true }]
                });
                res.json({
                    results: usuarios
                })
               } catch (error) {
                console.log(`Hubo un error ${error}`)
               }  

            }


 const buscarCategorias=async (termino='',res=response)=> {
          const mongoId =ObjectId.isValid(termino);
     
     if(mongoId){
      const categoria = await Categoria.findById(termino);
      return res.status(200).json({
            results: (categoria) ? [ categoria ] : []
        })
     }

     const regex=new RegExp(termino,'i');
     const categorias=await Categoria.find({nombre: regex , estado:true});
     return res.status(200).json({
         msg:"Categoria Encontrada",
         results: categorias     })
 }


 const buscarProductos= async (termino="",res=response) =>{

   try {
    const mongoId=ObjectId.isValid(termino);
    if(mongoId){
      const producto=await Producto.findById(termino)
                           .populate('categorias','nombre')
                            .populate('usuarios','nombre');
      return res.status(200).json({
        results:(producto)? [ producto]: []
    })
       }

    const regex=new RegExp(termino,'i');
    //no olvidarse del await en el retorno de una promesa en este caso en el retorno de la base da datos
    const productos=await Producto.find({nombre:regex})
                                  .populate('categorias','nombre')
                                  .populate('usuarios','nombre');
     return res.status(200).json({
        msg:"Producto encontrado",
        productos        
     })                       
       
   } catch (error) {
       console.log(`Hubo un error ${error}`);       
   }
 }

 const buscar=async (req,res=response) => {
    try {
    const {collection,termino}=req.params;
    if(!colleciones.includes(collection)){
        return res.status(400).json({
            msg:"Ese tipo de collecion no es valida intente con esta",
            colleciones
        })
    }    
   switch(collection){
       case 'usuarios':  
              return await buscarUsuario(termino,res);
              break;      
       case 'productos': 
              buscarProductos(termino,res);
              break;
       case 'categorias':
             buscarCategorias(termino,res);
             break;
       case 'roles':
             break;
              default:
           return res.status(500).json({
           msg:`Hubo un error comunicarse con el administrador`
           })       
   }         
    } catch (error) {
        console.log(`Hubo un error ${error}`)
    }
 }
 module.exports ={
    buscar,
 }