const { Schema, model } = require('mongoose');

const movimientoSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario', // Relación con el modelo de Usuario
    required: true,
  },
  tipo: {
    type: String,
    enum: ['deposito', 'retiro', 'comision', 'pago_servicio', 'consulta'],
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
});

module.exports = model('Movimiento', movimientoSchema);
