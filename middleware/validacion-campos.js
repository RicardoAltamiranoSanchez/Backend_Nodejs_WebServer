// //creamos unca carpeta para los middleware 
// const {validationResult} =require('express-validator'); //lo usamons para validar los parametros por eejmplo el email
// //por si hay Error este otro npm que funciono hasta ahora npm install --save express-validator
// //hacemos la validacion  de los campos es una funcnion normal 
// const validarCampos= (res,req,next) => {
//    const errores =validationResult(req);
//    if(!errores.isEmpty()){
//      return res.status(400).json(errores);
      
//    }
//    next();
// }

// /*const errores=  validationResult((req,res,next) =>{
// if(!errores.isEmpty()){
//  return res.status(400).json(errores);
//  //indicamos si tiene erroes mandamos el mensaje de error
//  //que ya habiamoa puesto en el check
// }
// next();//de decimos aqui que si ya poso la validacion que siga
// });*/

// module.exports={
//    validarCampos

// }
const { validationResult } = require('express-validator');


const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);
      try {
   if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
          
      } catch (error) {
        console.log(`Error en la validacion de errores en middleware ${error}`);
      }
 
}



module.exports = {
    validarCampos
}
