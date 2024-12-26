require('dotenv').config();
const {request, response } = require('express');
const bcryptjs = require('bcryptjs');
const { Usuario } = require('../models');
const { generarJWT } = require('../helpers/generar-JWT');

const login = async (req = request, res = response) =>{
    const {tarjeta,nip} = req.body;
    try {
        //verificar si la tarjeta del usuario existe
        const usuario = await Usuario.findOne({tarjeta});
        if(!usuario){
            return res.status(400).json({
                msg: 'Tarjeta / pin - no son correctos - tarjeta'
            })
        }
        //verificar nip
        const nipValido = bcryptjs.compareSync(nip, usuario.nip);
        if (!nipValido) {
            return res.status(400).json({
                msg: 'El NIP es incorrecto'
            });
        }
        //generar JWT
        const token = await generarJWT(usuario.id);
        // Configura la cookie sin 'secure' en entornos no seguros
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV === 'production',  // Solo se establece 'secure' en producción
            maxAge: 60 * 60 * 24 *1000,  // 1 dia de expiración
        });
        res.status(200).json({
            msg: 'Login exitoso',
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"hable con el admin"
        });
    }
}
const token = async (req = request, res = response) =>{
    res.status(200).json({
        msg: 'Token verificado - correcto'
    });
}
module.exports = {
   login,
   token
};