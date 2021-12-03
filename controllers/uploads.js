//Importante esta la libreria para utilizar el  servidor de cloudinary  debemos instalar npm i cloudinary
//npm i express-fileupload para poder cargar archivos debemos instalar esta libreria
//meter su middleware en el servidor 
//Tambien debemos instalar el uuid para poner un id diferente a cada archivo npm i uuid
//Se puede usar para cualquier cosas solo es crear un id unico

//Libreria para el uso del servidor para el resguardo de imagenes y videos y archivos etc;
const cloudinary = require('cloudinary').v2;
    //Hacemos la configuracion del  cloudinary para la conexion del servidor
cloudinary.config(process.env.CLOUDINARY_URL);
const { response } = require('express');
//no se necesita decir la ruta por que hicimos el index para que toda la ruta se importen de esta manera
const { subirArchivo } = require('../helpers');
const { Usuario, Producto,Playeras} = require('../models');
const path = require('path');
const fs = require('fs');


const cargarArchivos = async(req, res = response) => {
        // el req.files es para ver los archivos 
        console.log(req.files);

        //Cuando retornamos una promesa simpre debemos utilizar un try  catch para el manejo de errores

        try {

            //Este es solo un ejemplo de nuestra funcion que sirve para usarse de diferente tipos de extension y crear un carpeta nueva que los contenga  
            //const nombre=await subirArchivo(req.files,['txt','md'],"Textos");
            // de ponemos undefined por que ya tenenmos parametros por defecto 
            const nombre = await subirArchivo(req.files, undefined, "Imagenes");

            return res.status(200).json({ nombre })
        } catch (error) {
            return res.status(400).json({
                error
            })
        }
    }
    //Esta funcion es para actualizar un archivo especifico 
const actualizarArchivo = async(req, res) => {

    const { id, coleccion } = req.params;

    let modelo;
    //Usamos el switc para verificar si existe las colecciones que existe en nuestra base de datos           
    switch (coleccion) {
        case "usuarios":
            //Buscamos por el usuario si no da un valor lo verficiamos con el if y si no encontro nada no devuelve un mensaje
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(500).json({
                    msg: `Este id no  existe ${id}`
                })
            }
            break;
        case "productos":
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(500).json({

                    msg: `Este id  ${id} no existe en la lista de productos`
                })

            }
            break;
        default:
            return res.status(500).json({
                msg: `Falta unas evaluaciones por programar`

            })
    }
    //Buscamos si existe una imagen el modelo que hicismo l a busqueda de antes
    if (modelo.img) {
        //importante aqui por que tuve varios errores  debemos revisar bien que este bien el path para que haga la actualizacion 
        //Otra cosa importante  la informacion de la imagen en el campo de imagen debe ser la    uiid4 que  me daba el valor completo del path
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        console.log(pathImagen);
        //importamos fs es de systema con la funcion de existsSync verificamos si existe el path si nos da un true o false
        if (fs.existsSync(pathImagen)) {
            console.log("Si existe aqui se eliminan");
            //Con el unlinkSync eliminamos el pah completo esto lo hacemos para actualizar la imagen 
            fs.unlinkSync(pathImagen);
        }
    }






    //aqui guardamos el path en la variabel imagen y el archivo lo subimos a una carpeta en nuestra base de datos
    const imagen = await subirArchivo(req.files, undefined, coleccion);
    //guardamos la informacion en en modelo de la imagen y luego lo guardamos 
    modelo.img = imagen;
    await modelo.save();
    return res.status(200).json({
        msg: "Actualizacion de su imagen completa"

    })




}
const obtenerArchivo = async(req, res) => {
    const { id, coleccion } = req.params;

    let modelo;
    //Usamos el switc para verificar si existe las colecciones que existe en nuestra base de datos           
    switch (coleccion) {
        case "usuarios":
            //Buscamos por el usuario si no da un valor lo verficiamos con el if y si no encontro nada no devuelve un mensaje
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(500).json({
                    msg: `Este id no  existe ${id}`
                })
            }
            break;
        case "productos":
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(500).json({

                    msg: `Este id  ${id} no existe en la lista de productos`
                })

            }
            break;
        default:
            return res.status(500).json({
                msg: `Falta unas evaluaciones por programar`

            })
    }
    try {
        //Buscamos si existe una imagen el modelo que hicismo l a busqueda de antes
        if (modelo.img) {
            //importante aqui por que tuve varios errores  debemos revisar bien que este bien el path para que haga la actualizacion 
            //Otra cosa importante  la informacion de la imagen en el campo de imagen debe ser la    uiid4 que  me daba el valor completo del path
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            console.log(pathImagen);
            //importamos fs es de systema con la funcion de existsSync verificamos si existe el path si nos da un true o false
            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen);
            }
        }

        //Hacemos una funcion por si no hay una imagen en un usuario o producto y devolvemos una imagen por default para
        //Esto debe de ir fuera cuando indiquemos si la imagen existe ya que no funciona,solo funciona cuando un objeto no tiene imagen
        const pathImagen = path.join(__dirname, '../assets/default.jpg');
        return res.sendFile(pathImagen);

    } catch (error) {
        console.log("Error" + error);
    }
}

//Hacemos la funcion de actualizarArchivoCloudinary para el servidor de cloudinary guardamos la imagen en el servidor
const actualizarArchivoCloudinary = async(req, res) => {
console.log("inciando el programa de imagenes");

    const { id, coleccion } = req.params;
console.log(` el id  ${id} y la coleccion ${coleccion}`);
    let modelo;

    try {
   //Inicio de try para verificar los errores en el servidor

 //Usamos el switc para verificar si existe las colecciones que existe en nuestra base de datos           
 switch (coleccion) {
    case "usuarios":
        //Buscamos por el usuario si no da un valor lo verficiamos con el if y si no encontro nada no devuelve un mensaje
        modelo = await Usuario.findById(id);
        if (!modelo) {
            return res.status(500).json({
                msg: `Este id no  existe ${id}`
            })
        }
        break;
    case "productos":
        modelo = await Producto.findById(id);
        if (!modelo) {
            return res.status(500).json({

                msg: `Este id  ${id} no existe en la lista de productos`
            })

        }
        break;
        
    case "playeras":
        modelo = await Playeras.findById(id);
        if(!modelo){
          return res.status(500).json({

           msg:`Este id:${id} no existe o aun no se ha creado el producto `

          })

        }
        break;
    default:
        return res.status(500).json({
            msg: `Falta unas evaluaciones por programar en el servidor de imagenes`

        })
}




     //Fin ddel try del servidor   
    } catch (error) {
        console.log("Error en el switch tipo de Error:" + error);
    }
   
    //Buscamos si existe una imagen el modelo que hicismo l a busqueda de antes
    //limpiamos la imagen  donde esta el servidor y ponemos una nueva para no gastar memoria
    if (modelo.img) {
        //Hacemos un arreglo donde almacenamos la palabras pero y a sin el splist
        const nombreArr = modelo.img.split('/');
        //Obtenemos el ultimo valor del valor de imagen donde esta el id para hacer la modificacion dentro del modelo
        const nombre = nombreArr[nombreArr.length - 1];
        //separamos el punto para obtenenr el id solamente 
        const [public_id] = nombre.split('.');
        //destruimos la imagen  para poner una nueva
        await cloudinary.uploader.destroy(public_id);
    }
 try {
     

    // Desde el cliene obtenemos el valor de tempFilePath ya que un path de un archivo temporal
    const { tempFilePath } = req.files.archivo;
console.log(req.files.archivo);
    //subimo el valor en cloudinary y obtenemos el valor de secure_url  ya que es un id para poderlo meter en el campo de img del modelo
   //Importante tuve un error con cloudinary por la hora de mi lap debe estar  al corriente si no te sacara dolores de cabez
 const {secure_url}= await cloudinary.uploader.upload (tempFilePath, 
function (error, result) {
console.log (result, error)
});
    
    //Metemos el id de cloudinary dentro de la img del modelo
    modelo.img = secure_url;
    //Lo guardamos en la base de datos
    await modelo.save();
    res.json({ msg:'Imagen guardala con Exito'});

    // //aqui guardamos el path en la variabel imagen y el archivo lo subimos a una carpeta en nuestra base de datos
    //  const imagen= await subirArchivo(req.files,undefined,coleccion);
    //  //guardamos la informacion en en modelo de la imagen y luego lo guardamos 
    //  modelo.img=imagen;
    //  await modelo.save();
    // return res.status(200).json({
    //    msg:"Actualizacion de su imagen completa"
    //  })
 } catch (error) {
     console.log("Error al subir la imagen en el servidor de imagenes"+error);     


 }
}
module.exports = {
    cargarArchivos,
    actualizarArchivo,
    obtenerArchivo,
    actualizarArchivoCloudinary
}