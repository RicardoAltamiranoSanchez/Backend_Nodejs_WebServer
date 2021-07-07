const { Router } = require('express');//metodo para poder usar los routers
const { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');//es para hacer validaciones npm i express-validator

//const { validarCampos } = require('../middleware/validacion-campos');
//const {validarToken}=require("../middleware/validar-token");
//const {tieneRol}=require("../middleware/validar-role");

//Segunda forma solo se tiene que hacer el index en el middleware
const {

    validarCampos,
    validarToken,
    tieneRol

} = require('../middleware')

const { rolValidacion, emailExiste, idExiste } = require('../helpers/db-validaciones');
//tiene la misma funcion de this.app
//solo falta  importadaS en server para usarlas como un middleware bueno es un middleware 
//mandamos a llamar la funcion Router
const router = Router();

router.get('/', usuariosGet);
//hacemos validaciones para el id si existe o si es valido el id de mongo
router.put('/:id', [
    //aqui hacemos si el id es un valor de object
    check('id', "Este id no es valido").isMongoId(),
    //hacemos una vaidacion si existe el id
    check('id').custom(idExiste),
    check('rol').custom(rolValidacion),
    validarCampos
], usuariosPut);
//para meter una variable es o que lea una variable es con dos puntos y el id y alo puedes usar en el controlador
router.post('/', [check('correo', 'El correo no es válido').isEmail(),
check('correo').custom(emailExiste),
//indicamos que no puede ir vacio  pimero indicamos el campo que vamos a evaluar
check('nombre', "El nombre no debe ir vacio").not().isEmpty(),
//length ponemos la longitud que debe tener el password tambien se puede min y max
check("password", "La cotraseña debe tener mas de 6 caracteres").isLength({ min: 6 }),
    //con es isIn pones que debe de inclur lo ponemos enun arreglo
    //check("rol","Debe tener un rol").isIn(['ADMIN_ROLE',"USERNAME_ROLE"]),validarErrores
    //este es lo mismo qu el rol pero en una version personalizada con custom  es una verficacion  personalizada
    //recibe como argumento el valor que estamos evaluando osea el rol
    //lo iniciamos en un string  vacio para wue no halla confiicto 
    //check('rol').custom((rol)=> rolValidacion(rol))
    //si va hacer el mismo parametro es decir el rol y el, que se va enviar
    // se puede dejar solo asi check('rol').custom( rolValidacion)

    validarCampos], usuariosPost)

//importamos check y hacemos la validacion de correo 
router.patch('/', usuariosPatch);
router.delete('/:id', [validarToken,
    //validarRole,
    tieneRol('SUPER_USER', 'VENTAS_ROL'),
    check('id', "Este id no es valiudo").isMongoId(),
    check('id').custom(idExiste),
    validarCampos
], usuariosDelete);


//siempre debemos impprtar lo que vamos a separar
module.exports = router;