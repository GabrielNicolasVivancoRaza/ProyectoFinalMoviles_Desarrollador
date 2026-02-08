const mongoose = require('mongoose');

const lugarSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  latitud: {
    type: Number,
    required: true,
    min: -90,
    max: 90
  },
  longitud: {
    type: Number,
    required: true,
    min: -180,
    max: 180
  },
  categoria: {
    type: String,
    required: true,
    enum: ['hotel', 'gastronomia', 'cultura', 'naturaleza', 'entretenimiento']
  },
  imagenes: [{
    type: String
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  direccion: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    default: ''
  },
  horario: {
    type: String,
    default: ''
  },
  precio: {
    type: Number,
    default: 0,
    min: 0
  },
  etiquetas: [{
    type: String
  }],
  provincia: {
    type: String,
    required: true
  },
  canton: {
    type: String,
    required: true
  },
  activo: {
    type: Boolean,
    default: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar fechaActualizacion
lugarSchema.pre('save', function(next) {
  this.fechaActualizacion = Date.now();
  next();
});

module.exports = mongoose.model('Lugar', lugarSchema);