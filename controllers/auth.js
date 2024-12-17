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
        
        res.json({
            uid: usuario.id,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"hable con el admin"
        });
    }
}

module.exports = {
   login
};