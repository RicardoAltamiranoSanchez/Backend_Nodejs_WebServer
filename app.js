require('dotenv').config();//para que tome todo mi archivo de las varianbles de entorno osea el .env


const express= require('express');
const app=express();
//res.json es para enviar datos de tipo json
app.get('/',(req,res)=>{
console.log("Ricardo Altamiran");

});
app.listen(process.env.PORT,()=>{ // asi llamas una variable de entorno  para utilizarla con process.env.variable
console.log("Corriendo desde el puertoi",process.env.PORT);
});
