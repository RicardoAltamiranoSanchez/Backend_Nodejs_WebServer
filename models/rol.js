//para manejar el rol dentro de la verificacion 

const{Schema,model,} =require("mongoose");
//importamos el schema que es el esquema y el model
const rolSchema=Schema({
rol:{

type:String,
required:[ true, "el rol debe ser obligatorio"],

}
});
module.exports=model("Rol",rolSchema);