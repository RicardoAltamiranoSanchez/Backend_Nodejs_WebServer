
const{Router}= require('express');
const {check} = require('express-validator');
const {login,googleSingin}=require('../controllers/auth');
const {validarCampos}=require('../middleware/validacion-campos');


const router=Router();

router.post('/login',[
check("correo","Este email no es valido").isEmail(),
validarCampos],login);



//es para la authenticacion de google utilizando su api  de out2
router.post('/google',[
   check('nombre','El nombre es obligatorio').not().isEmpty(),
   
],googleSingin);

module.exports= router;
