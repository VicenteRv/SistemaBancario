const { Schema, model } = require('mongoose');

const movimientoSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario', // Relación con el modelo de Usuario (Cuenta origen)
    required: true,
  },
  tipo: {
    type: String,
    enum: ['deposito', 'retiro', 'transferencia', 'pago_servicio'],
    required: true,
  },
  monto: {  
    type: Number,
    required: true,
  },
  descripcion: {
    type: String, // Opcional para detalles del movimiento
    default: 'Movimiento realizado',
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  // Para transferencias, se pueden registrar el origen y destino
  origen: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario', // Usuario que envía el dinero (cuenta origen)
  },
  destino: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario', // Usuario que recibe el dinero (cuenta destino)
  },
});

module.exports = model('Movimiento', movimientoSchema);
