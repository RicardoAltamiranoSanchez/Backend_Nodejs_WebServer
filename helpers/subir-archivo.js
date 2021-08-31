//para leer en donde estamos ubicados 
const path = require('path');
//Esta libreria nos sirvre para crear un nombre unico o id 
const { v4: uuidv4 } = require('uuid');
uuidv4(); 
// Iniciamos los parametros para reutilizar el codigo para despues o otras rutas
const subirArchivo=(files,extensionesValidas=['PNG','jpg','jpge','gif','jfif'],carpeta="") =>{
   try {
 //Creamos una promesa para tener mayor control
    return new Promise((resolve, reject)=>{
        //hacemos una destrutration con el archivo 
       const {archivo}=files;
       //la funcion split se para la palabras cuando encuentre el caracater que de pusimos aqui se paramos el archivo
       const nombreCortado=archivo.name.split('.');
       //Ponemos las opciones para valiadar las extensiones 
       //const extensionesValidas=['PNG','jpg','jpge','gif',];
       //cortamos el nombre solo para abtener el nombre para su extension 
       const extension=nombreCortado[nombreCortado.length-1];
       //la funcion incluides es como un foreach pero busca un parametro dentro del  de decimos si no lo encuentra que nos  devuelva un error
       if(!extensionesValidas.includes(extension)){
       return reject(`Esta extension ${extension} no es permitida intenta con estas otras ${extensionesValidas}`);
            }
     //Creamos el nuevo nombre  con el uuidv y lo concatenamos con la extensio
      const NuevoNombre=uuidv4()+'.'+extension;
     //obtenemos el path completo de la ruta donde vamos a guadar el archivo
     const  uploadPath =path.join(__dirname,'../uploads/',carpeta,NuevoNombre);
     console.log("Desde la plantilla de subir archivo Iniciando...");
     console.log(uploadPath);
     console.log("Fin del  la plantilla de subir archivo");
     //De indicamos si hay un error que nos marque un errroi
     //movemos el archivo al path importante aqui por siempre debemos mandar el nombre del archivo para despues hacer metodos con la imagen como actualizar
     archivo.mv(uploadPath, (err) =>{
       if (err) {
      
        return res.status(500).send(err);
       
    }
       resolve( `${NuevoNombre}`);
     });
//fin de la promesa        
    })

     
   } catch (error) {
    console.log("Error donde esta el helpers de subirArchivo"+error);
     
   }
    
}
module.exports={subirArchivo};