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


const router = Router();

// Ruta para consultar saldo
router.post('/consultarSaldo',[
    validarJWT
], consultarSaldo);
// Ruta para consultar movimientos
router.get('/consultaMovimientos',[
    validarJWT
], consultaMovimientos);
// Ruta para retirar efectivo
router.post('/retiroEfectivo',[
    validarJWT
], retiroEfectivo);

// Ruta para depositar efectivo
router.post('/depositoEfectivo',[
    validarJWT
], depositoEfectivo);

// Ruta para pagar tarjeta
router.post('/pagoTarjeta',[
    validarJWT
], pagoTarjeta);

// Ruta para pagar servicios
router.post('/pagoServicios',[
    validarJWT
], pagoServicios);


module.exports = router;
