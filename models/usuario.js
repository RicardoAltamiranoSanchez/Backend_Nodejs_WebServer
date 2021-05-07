//pára  crear los modelos de usuario y los campo que requerimos
//mas informacion en la documentacion de mongoose
const{Schema,model}=require("mongoose");

const UsuarioSchema= Schema({
    nombre:{
        type:String,
        //el requiere quiere decir que es necesario y  Adentro del cochetes ponemos un mensaje cuando no se cumpla
        require:[true,"El nombre es obligatorio"]
    },
    correo:{
        type:String,
        require:[true,"El correo es obligatorio"],
        //el unique es para decir que no puede haber correos repetidos
        unique:true
    },
   password:{
       type:String,
       require:[true,"El password es obligatorio"]

   },
   img:{
      type:String

   },
   rol:{
        type:String,
        require:[true,"Se requiere el rol de la persona"],
        emun:['ADMIN_ROLE','USER_ROLE']//el emun indicamos los roles que tenemos oara ingresar
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
module.exports=model("Usuario",UsuarioSchema);
//para importar instanciamos el model y ponemos el nombre del campo que va ir y despues llamamos el objeto completo




