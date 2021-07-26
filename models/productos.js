const{Schema,model}=require('mongoose');

//hacemos el modelo de categorias 

const SchemaProducto=Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
 usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    marca: {
        type:String,
        trim:true,
        
    },
    descripcion: {
        type:String,
        trim:true,
    },
    
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: { type: String },
    disponible: { type: Boolean, defult: true },

    img:
     { type:String,
    trim:true,},
});

SchemaProducto.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}

module.exports=model('Producto',SchemaProducto);