const {request, response } = require('express');
const bcryptjs = require('bcryptjs');
const { generarNumeroTarjeta } = require('../helpers/tarjeta-validators');
const { Usuario } = require('../models');
const { existeTarjetaUsuario } = require('../helpers/db-validators');

//crear usuario
const usuariosPost = async(req = request, res = response) =>{
    const {nombre,nip, esDelBancoOficial = true} = req.body;
    //generar nuevo numero de tarjeta
    let tarjeta;
    //validar si ya existe para crear otra en caso de que si
    do{
        tarjeta = generarNumeroTarjeta();
    }while(await existeTarjetaUsuario(tarjeta))
    const usuario = new Usuario({nombre,nip,esDelBancoOficial,tarjeta});
    //encryptar nip
    const salt = bcryptjs.genSaltSync();
    usuario.nip = bcryptjs.hashSync(nip,salt)
    await usuario.save();
    res.status(201).json({
        usuario
    })
}
//modificar nip con jwt activo
const usuariosPut = async (req = request, res = response) => {
    const { nipActual, nipNuevo } = req.body;
    const { id } = req.params;

    const usuario = await Usuario.findById(id);
    // Verificar si el nipActual coincide con el NIP almacenado en la base de datos
    const nipValido = bcryptjs.compareSync(nipActual, usuario.nip);
    if (!nipValido) {
        return res.status(400).json({
            msg: 'El NIP es incorrecto'
        });
    }

    // Verificar que el nuevo NIP no sea igual al actual
    if (nipActual === nipNuevo) {
        return res.status(400).json({
            msg: 'El NIP nuevo no puede ser igual al actual'
        });
    }

    // Encriptar el nuevo NIP
    const salt = bcryptjs.genSaltSync();
    const nipEncriptado = bcryptjs.hashSync(nipNuevo, salt);

    // Actualizar el NIP directamente usando findByIdAndUpdate
    await Usuario.findByIdAndUpdate(id, { nip: nipEncriptado });

    res.json({
        msg: 'NIP actualizado correctamente'
    });
};


module.exports = {
   usuariosPost,
   usuariosPut
};
