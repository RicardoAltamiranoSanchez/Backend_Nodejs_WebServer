//conexion ala base de datos se debe instalar mongoose npm i
const mongoose =require('mongoose');



const dbConnection = async ()=>{

try {
  await mongoose.connect(process.env.MONGODB_CNN,{

    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false,
  });//aqui hacemos la conexiones y regresa un promesa entonces utilizamos el await para crearala
   //lo instanciamos desde la variable de entorno
  //esta es la funcion de la base de datos
  console.log("Conexion exitosa en la base de datos mongodb")   
} catch (error) {
    console.log(error);
    throw new Error("Error ala hora de iniciar la base de datos");

}
}


module.exports={


    dbConnection,
}