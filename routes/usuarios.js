const { Router } = require('express');
const {check} = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosPost, usuariosPut } = require('../controllers/usuarios');
const { existeUsuarioPorId } = require('../helpers/db-validators');
const router = Router();

//crear usuario tarjeta nip automatico
router.post('/registrar',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nip','El nip debe de contener 4 numeros').isLength({min:4}),
    validarCampos
], usuariosPost );
// mofidicar nip tiene que estar loggeado jwt
router.put('/:id',[
    validarJWT,
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('nipActual','Debe ingresar su nip actual').not().isEmpty(),
    check('nipActual','El nip debe de contener 4 numeros').isLength({min:4,max:4}),
    check('nipNuevo','Debe de ingresar su nuevo nip').not().isEmpty(),
    check('nipNuevo','El nip debe de contener 4 numeros').isLength({min:4,max:4}),
    validarCampos
],usuariosPut);

module.exports = router;