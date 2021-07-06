//pára  crear los modelos de usuario y los campo que requerimos
//mas informacion en la documentacion de mongoose
const { Schema,model }=require("mongoose");
//const { model } = require('mongoose');
const UsuarioSchema= Schema({
    nombre:{
        type:String,
        //el requiere quiere decir que es necesario y  Adentro del cochetes ponemos un mensaje cuando no se cumpla
        require:[true,"El nombre es obligatorio"],
        trim:true,
        
    },
    correo:{
        type:String,
        require:[true,"El correo es obligatorio"],
        trim:true,
        //el unique es para decir que no puede haber correos repetidos
        unique:true,
    

    },
   password:{
       type:String,
       trim:true,
       require:[true,"El password es obligatorio"],
      

   },

   img:{
      type:String,
      trim:true,
      

   },
   descripcion:{
      type:String, 
      trim:true,
 require:[true,"se requiere una descripcion del usuario que intentas ingresar"],
 
        
   },
   rol:{
        type:String,
        trim:true,
       
        require:[true,"Se requiere el rol de la persona"],
        emun:['ADMIN_ROLE','USER_ROLE'],//el emun indicamos los roles que tenemos oara ingresar
        default:'USER_ROLE'
   },
   estado:{
    type:Boolean,
    default:true
   }, 
   google:{
       type:Boolean,
       default:false
   }
});
//se puede crear metodos o sobreecribir metodos
//debe ser una funcion normal
//se puede modifcar los metodos aqui y mostrar o no 
//o poner nuevos parametros
UsuarioSchema.methods.toJSON= function(){
const {__v,password,_id,...usuario}=this.toObject();//es como si fuera objeto literal
//quitamos eso valores despues lo almacenamos en usuario haciando destruracion
usuario.uid=_id;
return usuario;
}
module.exports=model("Usuario",UsuarioSchema);
//para importar instanciamos el model y ponemos el nombre del campo que va ir y despues llamamos el objeto completo




