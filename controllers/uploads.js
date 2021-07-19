//npm i express-fileupload para poder cargar archivos debemos instalar esta libreria
//meter su middleware en el servidor 

const {response}=require('express');
//para leer en donde estamos ubicados 
const path = require('path');

const cargarArchivos= async (req, res=response) => {
    // el req.files es para ver los archivos 
    console.log(req.files);


    //de decimos sino tienen nada y hace un a comparacion de la llaves  y si  el nombre del archivo esta vacio  que nos devuelva un errror
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg:'No hay ninngun archivo que subir',});
       
     }
    //hacemos una destrutration con el archivo 
      const {archivo}=req.files;

      //la funcion split se para la palabras cuando encuentre el caracater que de pusimos aqui se paramos el archivo
      const nombreCortado=archivo.name.split('.');
      //Ponemos las opciones para valiadar las extensiones 
      const extensionesValidas=['png','jpg','jpge','gif',];
      //cortamos el nombre solo para abtener el nombre para su extension 
      const extension=nombreCortado[nombreCortado.length-1];
      //la funcion incluides es como un foreach pero busca un parametro dentro del  de decimos si no lo encuentra que nos  devuelva un error
      if(!extensionesValidas.includes(extension)){
 
 return res.status(400).json({ msg:`Esta extension ${extension} no es permitida intenta con estas otras ${extensionesValidas}`
  
           })
      }
 
  return res.status(200).json({
 
     msg:extension
  })

    


    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
       return res.status(400).json({msg:'No hay ninngun archivo que subir',});
      
    }
  
   
     const {archivo}=req.files;

    //obtenemos el path completo de la ruta donde vamos a guadar el archivo
    const  uploadPath =path.join(__dirname,'../uploads/',archivo.name);
  
    //De indicamos si hay un error que nos marque un errroi
    archivo.mv(uploadPath, (err) =>{
      if (err) {
        return res.status(500).send(err);
      }
  
      res.json({msg:'File uploaded to ' + uploadPath});
    });



}

module.exports={cargarArchivos}


