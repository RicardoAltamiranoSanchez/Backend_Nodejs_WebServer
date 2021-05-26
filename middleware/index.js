//utilizamos esta planmtilla para no tener tanto codigo  
const validarCampos= require('../middleware/validacion-campos');
const validacionToken=require("../middleware/validar-token");
const validacionRol=require("../middleware/validar-role");

//utilizamos este para destrution para no validar no llamar  a todos los parametros

module.exports={
...validarCampos,
...validacionToken,
...validacionRol
}