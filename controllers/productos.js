const {response,request}=require('express');
const {Categoria,Producto}=require('../models')


const obtenerProductos=async  (req,res)=>{

    const nombre=req.body;

    const producto= await Producto.find(nombre);
    return res.status(200).json({
        msg:`Producto Seleccion ${producto.nombre}`,
        producto
    })
}

const crearProducto=async (req,res) => {
      try {

       
      const {estado,usuario,...resto}=req.body;
      const existeProducto=await Producto.find({nombre:req.body.nombre})
      if(existeProducto){
           return res.status(201).json({
               msg:`Este producto ya existe ${existeProducto}`,
       })         
      }
      const data={
          ...resto,
          nombre: resto.nombre.toUpperCase(),
          usuario=req.usuario.id
      }

      const producto= new Producto(data);
      await producto.save();
      
      return res.status(201).json({
       msg:`Producto Creado `,
       producto

      })



          
      } catch (error) {
         console.log(`Ocurrio un error ${error}`); 
      }




}

module.exports={

    crearProducto
}