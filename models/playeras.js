const {Schema,model}=require('mongoose');


const Shemaplayeras=Schema({
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
   nombre:{
    type:String,
    required:[true,'Es obligatorio'],
    unique:true
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
    img: {
        type:String,
        trim:true,
    }
   
})

Shemaplayeras.methods.toJSON = function() {
 
    const {__v,...data} = this.toObject();
    return data;

}

module.exports=model('Playeras',Shemaplayeras);
