const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')

const validarJWT = async(req = request,res = response,next)=>{
    // const token = req.header('x-token');
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }
    try {
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if(!usuario){   
            return res.status(401).json({
                msg: 'token no valido - usuario no existe en bd'
            })
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
   validarJWT
}; 