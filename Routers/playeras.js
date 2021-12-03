const Router=require('express');

const {check}=require('express-validator');
const {response}=require('express');
const { rolValidacion, emailExiste, idExiste } = require('../helpers/db-validaciones');
const {Obtenerplayeras,
        Crearplayeras,
        ObtenerPlayerasID,
        EliminarPlayeras,
        Actualizarplayeras,

                      }
=require('../controllers/playeras');


const router=Router();

router.get('/',Obtenerplayeras);
router.post('/',Crearplayeras);
router.get('/:id',ObtenerPlayerasID);
router.put('/:id',Actualizarplayeras);
router.delete('/:id',[check('id', "Este id no es valido").isMongoId(),
//hacemos una vaidacion si existe el id
check('id').custom(idExiste),EliminarPlayeras]);



module.exports=router