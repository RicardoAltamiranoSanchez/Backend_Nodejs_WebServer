const {request,response}=require('express');

//Esto solo para verificar si existe un archivo por subirArchivo y lo creamos en un middleware
//por que lo uti8lizamos varias veces y no utilizamos tanto codigo

const validarArchivo=(req,res, next) =>{
     //de decimos sino tienen nada y hace un a comparacion de la llaves  y si  el nombre del archivo esta vacio  que nos devuelva un errror
     if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg:'No hay ningun archivo que subir',});       
      }
      next();



}
module.exports ={validarArchivo}