const{Schema,model}=require('mongoose');

//hacemos el modelo de categorias 

const SchemaCategoria=Schema({
    nombre:{
        type:String,
        required:[true,'Es obligatorio'],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true,
    },
    //Este sera de donde esta relacionada la tabla os
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
        
})

SchemaCategoria.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}



module.exports=model('Categoria',SchemaCategoria);