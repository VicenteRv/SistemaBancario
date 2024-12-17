
const {Schema,model} = require('mongoose');
const UsuarioSchema = new Schema({
      tarjeta: {
        type: String,
        required: [true,'Numero de targeta obligatoria'],
        unique: true,
      },
      nip: {
        type: String,
        required: [true,'Nip requerido'],
      },
      nombre: {
        type: String,
        required: [true,'El nombre es obligatorio'],
      },
      esDelBancoOficial: {
        type: Boolean,
        required: true,
        default: true,
      },
      saldo: {
        type: Number,
        required: true,
        default: 0,
      },    
      // Relación con los movimientos
      movimientos: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Movimiento', // Relación con la colección de movimientos
        },
      ],
    
      fechaCreacion: {
        type: Date,
        default: Date.now,
      },
      ultimaActualizacion: {
        type: Date,
        default: Date.now,
      }
});

//modifica la respuestas donde se hace el res.json del molelo
UsuarioSchema.methods.toJSON = function(){
  const {__v,_id, ...usuario } = this.toObject();
  usuario.uid=_id;    
  return usuario; 
}

module.exports = model('Usuario',UsuarioSchema);