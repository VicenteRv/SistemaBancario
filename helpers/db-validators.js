const {Usuario,Movimiento} = require('../models');


const existeTarjetaUsuario = async (tarjeta)=>{
    const existeTarjeta = await Usuario.findOne({tarjeta})
    return existeTarjeta ? true : false;
}
const existeUsuarioPorId = async(id)=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`No existe usuario con id: ${id}`);
    }
}
const existeNuevaTarjeta = async (tarjeta = '') =>{
    const existe = await Usuario.findOne({tarjeta});
    if(existe){
        throw new Error(`La tarjeta con numeros ${tarjeta} ya fue registrada`);
    }
}
module.exports = {
   existeNuevaTarjeta,
   existeTarjetaUsuario,
   existeUsuarioPorId,
};