
const{Router}= require('express');
const { check } = require('express-validator');
const {login,googleSingin}=require('../controllers/auth');
const {validarCampos}=require('../middleware/validacion-campos');


const router=Router();

router.post('/login',[
check("correo","Este email no es valido").isEmail(),
validarCampos],login);




router.post('/google',[
   check('id_token','Requieren token').not().isEmpty()
],googleSingin);

module.exports= router;
