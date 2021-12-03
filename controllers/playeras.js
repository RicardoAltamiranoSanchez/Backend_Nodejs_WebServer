const {response}=require('express');
const {Playeras}=require('../models');


const Obtenerplayeras=async (req,res=response)=>{

const estado={estado:true};

try {

    const [total,playeras]= await Promise.all([
        Playeras.countDocuments(estado),
        Playeras.find(estado)]);
    
    
    return res.status(200).json({
    playeras
    })


    
 } catch (error) {
     console.log(`Hubo un error al momento de obtener la informacion de los usuarios${error}`);
    
}
}
const ObtenerPlayerasID=async (req,res=response)=>{
    const {id}=req.params;
        


    try {
        playera= await Playeras.findById(id);
        if(!playera){
            return res.status(404).json({
                msg:'El producto no existe'
            })
        } 
        return res.status(200).json({
            msg:"Seleccionado por id",
            playera
    
    })   
    } catch (error) {
        console.log(`Hubo un error al conectyarse cone el servidor ${error}`);
    }
}


const Crearplayeras= async (req,res=response)=>{


    const {nombre,...data}=req.body;
    try {
        const Existeplayera= await Playeras.findOne({nombre});
        console.log(Existeplayera);
        if(Existeplayera){
         return res.status(301).json({
                msg:'Ya existe una playera con ese nombre',
        })
    }
    const info={
      nombre:nombre.toUpperCase(),
        ...data
    }
    
    const playera=new Playeras(info);

    await playera.save();

    return res.status(200).json({
      msg:'Accion realizada Correctamente',
    })


   } catch (error) {
        console.log(`Hubio un error al conectyarse cone el servidor ${error}`);
        
    }

    
}


const EliminarPlayeras=async (req,res=response)=>{


    const {id}=req.params;
const Eliminado= await Playeras.findOneAndDelete(id);
return res.status(200).json({
msg:` Elemento eliminado con el id_:${id} Eliminado: ${Eliminado}`


})



}

const Actualizarplayeras=async (req,res=response)=>{


const {id}=req.params;

const {...resto}=req.body;

const info= await Playeras.findByIdAndUpdate(id,resto,{new:true});

return res.status(200).json({
msg:`Elemento actualizado con el info:${info}`,



})}






module.exports ={
    Obtenerplayeras,
    Crearplayeras,
    ObtenerPlayerasID,
    EliminarPlayeras,
    Actualizarplayeras
    }
    