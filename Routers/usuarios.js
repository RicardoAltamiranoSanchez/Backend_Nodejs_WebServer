const {Router} = require('express');//metodo para poder usar los routers
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');//es para hacer validaciones npm i express-validator

//tiene la misma funcion de this.app
//solo falta  importadaS en server para usarlas como un middleware bueno es un middleware 
//mandamos a llamar la funcion Router
const router=Router();


router.get('/',usuariosGet);
router.put('/:id',usuariosPut);
//para meter una variable es o que lea una variable es con dos puntos y el id y alo puedes usar en el controlador
router.post('/',check('correo', 'El correo no es válido').isEmail(),usuariosPost);
//importamos check y hacemos la validacion de correo 
router.patch('/',usuariosPatch);
router.delete('/',usuariosDelete);


//siempre debemos impprtar lo que vamos a separar
module.exports=router;