//importamos para generar el token 
const jwt = require('jsonwebtoken');
const generarToken=  (uid ="" ) => {
return new Promise ((resolve,reject)=>{
        //hacemos el playlod solo informacion que no sea importante
        const playlod={uid};
        //este es un metodo de jwt para hcer el token indicamos el primer parametro
        //que es de que infromacion va utilizar para generar el token
        //en el segundo es la llave secreta que hicimos de una via
        //se hace desde el modo global osea desde env
        jwt.sign(playlod,process.env.SECRETORPRIVATEKEY,{
        //este cuando expira el token 
           expiresIn:"4h"
        },(error,token)=>{
        //aqui solo hacemos un callback des envio de error o resultados 
            if(error){
                console.log(error);
                reject("No se pudo generar el token");
            }else{
                resolve(token)
            }
        })  
    }
  )
}
module.exports={
    generarToken
}