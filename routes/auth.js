const { Router } = require('express');
const {check} = require('express-validator');
const { login } = require('../controllers/auth');
const { validarTarjeta } = require('../helpers/tarjeta-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
router.post('/login',[
    check('tarjeta','Tiene que ingresar la tarjeta').not().isEmpty(),
    check('tarjeta','Faltan digitos a la tarjeta').isLength({min:16,max:16}),
    check('tarjeta').custom(validarTarjeta),
    check('nip','Debe de ingresar el nip').not().isEmpty(),
    check('nip','El nip debe de contener 4 numeros').isLength({min:4}),
    validarCampos
],login);



module.exports = router;