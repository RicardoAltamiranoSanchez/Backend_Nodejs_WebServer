//utilizamos esta planmtilla para no tener tanto codigo  
const validacionCampos= require('../middleware/validacion-campos');
const validacionTokenn=require("../middleware/validar-token");
const validacionRol=require("../middleware/validar-role");

//utilizamos este para destrution para no validar no llamar  a todos los parametros

module.exports={
...validacionCampos,
...validacionTokenn,
...validacionRol
}