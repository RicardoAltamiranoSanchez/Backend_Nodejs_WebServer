//Aqui haces un solo archivo para exportar todos 
const dbvalidaciones=require('../helpers/db-validaciones');
const googleVerificacion =require('../helpers/google-verificacion');
const subirArchivo=require('../helpers/subir-archivo');
const token =require('../helpers/token');



module.exports={
    //lo exportamos con los puntos para que los exporte con todo y sus funciones que tienen adentro en el archivo
    ...dbvalidaciones,
    ...googleVerificacion,
    ...subirArchivo,
    ...token,
}