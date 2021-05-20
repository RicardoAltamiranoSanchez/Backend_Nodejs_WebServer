//utilizamos el codigo que esta en la pagina de google para hacer la autenticacion en el token
//este es la pagina para el procedimiento del token en google  https://developers.google.com/identity/sign-in/web/backend-auth
const {OAuth2Client} = require('google-auth-library');

//llamamos el id de google osea la llave publica para tener la conexion
const client = new OAuth2Client (process.env.GOOGLE_CLIENT_ID);

//la convertimos en una funcion de fecha y en una promesa
const verificacionGoogle=   async (idToken="") => {
      const ticket = await client.verifyIdToken({
      idToken,
      audience:process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
       
  //obtenemos solo los valores que queremos
  //podemos asignarles nuevos nombres para no gastar codigo debemos poner las varibles de google
  const {nombre:name,img:picture,correo:email}= ticket.getPayload();
       return  {nombre,img,correo};
 //aqui obtenemos una informacion especifica del token
  ////// const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
module.exports={

    verificacionGoogle
}