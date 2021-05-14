//importampos le jsonweb token
const { response, request } = require('express')
const jwt =require('jsonwebtoken');
//los middleware siempre seran funciones de fechas se usan solo para validaciones
const validarToken=(req=response,res=request,next)=>{
const token= req.header('x-token');
console.log(token);

next();
}


module.exports={
    validarToken
}