const {request, response } = require('express');
const { Usuario, Movimiento } = require('../models');


const operacionesPermitidas = [
    'retiroEfectivo',
    'depositoEfectivo',
    'pagoTarjeta',
    'pagoServicios',
    'consultaMovimientos'
];
const consultarSaldo = async(req = request, res = response) =>{
    const id = req.usuario.id;
    const usuario = await Usuario.findById(id);
    res.json({
        saldo: usuario.saldo,
    })
} 
const retiroEfectivo = async(req = request, res = response) =>{
    const { monto } = req.body;
    const id = req.usuario.id;
    const usuario = await Usuario.findById(id);

    // Validar si tiene saldo suficiente
    if (usuario.saldo < monto) {
        return res.status(400).json({
            msg: 'Saldo insuficiente. No puede retirar más de lo que tiene.',
            saldoActual: usuario.saldo,
        });
    }
    // Actualizar el saldo del usuario
    usuario.saldo = Number(usuario.saldo) - Number(monto);
    await usuario.save();

    // Responder con el nuevo saldo
    res.json({
        msg: 'Retiro realizado con éxito.',
        saldo: usuario.saldo,
    });
} 
const depositoEfectivo = async(req = request, res = response) =>{
    const { monto, descripcion = "Deposito Efectivo", tipo = "deposito" } = req.body;
    const id = req.usuario.id;
    const usuario = await Usuario.findById(id);

    // Actualizar el saldo del usuario
    usuario.saldo += monto;
    await usuario.save();
    //crear el movimiento del deposito
    const movimiento = new Movimiento({
        usuario:id,
        tipo,
        monto,
        descripcion,
    })
    await movimiento.save();

    res.json({
        msg: 'Depósito realizado con éxito',
        saldo: usuario.saldo,
    });
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
