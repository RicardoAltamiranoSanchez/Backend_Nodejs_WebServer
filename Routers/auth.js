
const{Router}= require('express');
const { check } = require('express-validator');
const{Autenticacion}=require('../controllers/auth');
const {validarCampos}=require('../middleware/validacion-campos');
const router=Router();

router.post('/login',[
check("correo","Este email no es valido").isEmail(),
validarCampos],Autenticacion);


module.exports= router;
