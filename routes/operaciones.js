const { Router } = require('express');
const {check} = require('express-validator');
const {
    consultarSaldo,
    retiroEfectivo,
    depositoEfectivo,
    pagoTarjeta,
    pagoServicios,
    consultaMovimientos,
} = require('../controllers/operaciones');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

// Ruta para consultar saldo
router.post('/consultarSaldo',[
    validarJWT,
    validarCampos
], consultarSaldo);
// Ruta para consultar movimientos
router.get('/consultaMovimientos',[
    validarJWT,
    validarCampos
], consultaMovimientos);
// Ruta para retirar efectivo
router.post('/retiroEfectivo',[
    validarJWT,
    validarCampos
], retiroEfectivo);

// Ruta para depositar efectivo
router.post('/depositoEfectivo',[
    validarJWT,
    validarCampos
], depositoEfectivo);

// Ruta para pagar tarjeta
router.post('/pagoTarjeta',[
    validarJWT,
    validarCampos
], pagoTarjeta);

// Ruta para pagar servicios
router.post('/pagoServicios',[
    validarJWT,
    validarCampos
], pagoServicios);


module.exports = router;
