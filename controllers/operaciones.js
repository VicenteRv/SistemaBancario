const {request, response } = require('express');
const { Usuario } = require('../models');


const operacionesPermitidas = [
    'retiroEfectivo',
    'depositoEfectivo',
    'pagoTarjeta',
    'pagoServicios',
    'consultaMovimientos'
];
const consultarSaldo = async(req = request, res = response) =>{
    const { id } = req.body;
    const usuario = await Usuario.findById(id);
    res.json({
        saldo: usuario.saldo
    })
    
} 
const retiroEfectivo = (req = request, res = response) =>{
    res.json({
        msg: 'controlador de operacion retiro de efectivo'
    })
} 
const depositoEfectivo = (req = request, res = response) =>{
    res.json({
        msg: 'controlador de operacion deposito en efectivo'
    })
} 
const pagoTarjeta = (req = request, res = response) =>{
    res.json({
        msg: 'controlador de operacion pago de tarjeta'
    })
} 
const pagoServicios = (req = request, res = response) =>{
    res.json({
        msg: 'controlador de operacion pago de servicios'
    })
} 
const consultaMovimientos = (req = request, res = response) =>{
    res.json({
        msg: 'controlador de operacion consulta de movimientos'
    })
} 
module.exports = {
    consultarSaldo,
    retiroEfectivo,
    depositoEfectivo,
    pagoTarjeta,
    pagoServicios,
    consultaMovimientos,
};
