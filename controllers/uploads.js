//npm i express-fileupload para poder cargar archivos debemos instalar esta libreria
//meter su middleware en el servidor 
//Tambien debemos instalar el uuid para poner un id diferente a cada archivo npm i uuid
//Se puede usar para cualquier cosas solo es crear un id unico
const {response}=require('express');
//no se necesita decir la ruta por que hicimos el index para que toda la ruta se importen de esta manera
const {subirArchivo}=require('../helpers');

   const cargarArchivos= async (req, res=response) => {
    // el req.files es para ver los archivos 
    console.log(req.files);
     //de decimos sino tienen nada y hace un a comparacion de la llaves  y si  el nombre del archivo esta vacio  que nos devuelva un errror
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg:'No hay ninngun archivo que subir',});       
      }
   //Cuando retornamos una promesa simpre debemos utilizar un try  catch para el manejo de errores
  
      try {
       
      //Este es solo un ejemplo de nuestra funcion que sirve para usarse de diferente tipos de extension y crear un carpeta nueva que los contenga  
      //const nombre=await subirArchivo(req.files,['txt','md'],"Textos");
      // de ponemos undefined por que ya tenenmos parametros por defecto 
      const nombre =await subirArchivo(req.files,undefined,"Imagenes");

      return res.status(200).json({nombre})   
   } catch (error) {
       return res.status(400).json({
         error
       })  
   }
}
const actualizarArchivo=async (req,res)=> {
  const {id,coleccion}=req.params;


  return res.status(200).json({
     id,
     coleccion,

  })




}

module.exports={
  cargarArchivos,
  actualizarArchivo
}


