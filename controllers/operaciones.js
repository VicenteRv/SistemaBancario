const {request, response } = require('express');
const { Usuario, Movimiento } = require('../models');

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
const consultaMovimientos = async (req = request, res = response) => {
    try {
        const { id } = req.usuario;
        const [total, movimientos] = await Promise.all([
            Movimiento.countDocuments({ usuario: id }),
            Movimiento.find({ usuario: id }).sort({ fecha: -1 }).populate('usuario','nombre')
        ]);
        // Formateamos la fecha de cada movimiento de forma entendible usando Intl.DateTimeFormat
        const fechaFormato = new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
        const fechaFormateada = movimientos.map(movimiento => {
            return {
                ...movimiento.toObject(),
                fecha: fechaFormato.format(new Date(movimiento.fecha))  // Formato: 26/12/2024, 15:30:45
            };
        });
        res.json({
            total,
            movimientos: fechaFormateada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hubo un error al obtener los en el back',
        });
    }
};

const transferencia = (req = request, res = response) =>{
    res.json({
        msg: 'controlador de operacion pago de tarjeta'
    })
} 
const pagoServicios = (req = request, res = response) =>{
    res.json({
        msg: 'controlador de operacion pago de servicios'
    })
} 
module.exports = {
    consultarSaldo,
    retiroEfectivo,
    depositoEfectivo,
    transferencia,
    pagoServicios,
    consultaMovimientos,
};
