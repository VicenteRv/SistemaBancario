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
    const { monto, descripcion = "Retiro Efectivo", tipo = "retiro" } = req.body;
    const { id } = req.usuario; // Usamos el id del usuario desde req.usuario
    let usuario = await Usuario.findById(id);
    // Validar si tiene saldo suficiente
    if (usuario.saldo < monto) {
        return res.status(400).json({
            msg: 'Saldo insuficiente. No puede retirar más de lo que tiene.',
            saldoActual: usuario.saldo,
        });
    }
    // Usamos findByIdAndUpdate para actualizar directamente el saldo en la base de datos
    usuario = await Usuario.findByIdAndUpdate(id, {
        $inc: { saldo: -monto }, // Decrementamos el saldo
    }, { new: true }); // La opción `new: true` retorna el documento actualizado
    
    // Crear el movimiento de depósito
    const movimiento = new Movimiento({
        usuario: id,
        tipo,
        monto,
        descripcion,
    });
    await movimiento.save();

    // Responder con el nuevo saldo
    res.json({
        msg: 'Retiro realizado con éxito.',
        saldo: usuario.saldo,
    });
} 
const depositoEfectivo = async(req = request, res = response) => {
    const { monto, descripcion = "Deposito Efectivo", tipo = "deposito" } = req.body;
    const { id } = req.usuario; // Usamos el id del usuario desde req.usuario
    const usuario = await Usuario.findByIdAndUpdate(
        id, 
        { $inc: { saldo: monto } }, // Incrementamos el saldo
        { new: true } // Retornamos el documento actualizado
    );
    // Crear el movimiento de depósito
    const movimiento = new Movimiento({
        usuario: id,
        tipo,
        monto,
        descripcion,
    });
    await movimiento.save();

    res.json({
        msg: 'Depósito realizado con éxito',
        saldo: usuario.saldo,
    });
};

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
