const mongoose = require('mongoose');
const Lugar = require('./models/Lugar');
require('dotenv').config();

// Conectar a MongoDB (usa MONGODB_URI del .env o localhost por defecto)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vivanco_turismo';

mongoose.connect(MONGODB_URI);

console.log('🔌 Conectando a:', MONGODB_URI.includes('mongodb+srv') ? 'MongoDB Atlas (Nube)' : 'MongoDB Local');

// Datos de ejemplo con imágenes
const lugaresEjemplo = [
  {
    nombre: 'Hotel Zaracay',
    descripcion: 'Hotel de lujo con todas las comodidades en el centro de Santo Domingo',
    latitud: -0.2489,
    longitud: -79.1698,
    categoria: 'hotel',
    imagenes: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop&crop=center'
    ],
    rating: 4.5,
    numReviews: 324,
    direccion: 'Av. Quito 1639',
    telefono: '+593 2 275 0316',
    horario: '24 horas',
    precio: 65.0,
    etiquetas: ['Lujo', 'Centro', 'WiFi', 'Piscina'],
    provincia: 'Santo Domingo de los Tsáchilas',
    canton: 'Santo Domingo'
  },
  {
    nombre: 'Restaurante El Sazón Tsáchila',
    descripcion: 'Auténtica gastronomía local con los mejores sabores de la región',
    latitud: -0.2501,
    longitud: -79.1789,
    categoria: 'gastronomia',
    imagenes: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&crop=center'
    ],
    rating: 4.7,
    numReviews: 567,
    direccion: 'Av. Quevedo y 3 de Julio',
    telefono: '+593 2 275 3456',
    horario: '11:00 - 22:00',
    precio: 12.0,
    etiquetas: ['Comida típica', 'Familia', 'Local', 'Tradicional'],
    provincia: 'Santo Domingo de los Tsáchilas',
    canton: 'Santo Domingo'
  },
  {
    nombre: 'Bosque Protector La Perla',
    descripcion: 'Hermoso bosque tropical con senderos naturales y diversa fauna',
    latitud: -0.2420,
    longitud: -79.1750,
    categoria: 'naturaleza',
    imagenes: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center'
    ],
    rating: 4.8,
    numReviews: 234,
    direccion: 'Vía Santo Domingo - Quito Km 15',
    telefono: '+593 2 275 0345',
    horario: '08:00 - 17:00',
    precio: 5.0,
    etiquetas: ['Ecoturismo', 'Senderismo', 'Aves', 'Fotografía'],
    provincia: 'Santo Domingo de los Tsáchilas',
    canton: 'Santo Domingo'
  },
  {
    nombre: 'Museo de la Cultura Tsáchila',
    descripcion: 'Descubre la rica historia y tradiciones del pueblo Tsáchila',
    latitud: -0.2531,
    longitud: -79.1752,
    categoria: 'cultura',
    imagenes: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1585336261022-680e8a3b528e?w=800&h=600&fit=crop&crop=center'
    ],
    rating: 4.3,
    numReviews: 189,
    direccion: 'Av. Quito y 29 de Mayo',
    telefono: '+593 2 275 2345',
    horario: '09:00 - 17:00',
    precio: 3.0,
    etiquetas: ['Historia', 'Cultura', 'Tradiciones', 'Educativo'],
    provincia: 'Santo Domingo de los Tsáchilas',
    canton: 'Santo Domingo'
  },
  {
    nombre: 'Parque de Diversiones Aventura',
    descripcion: 'Diversión para toda la familia con emocionantes atracciones',
    latitud: -0.2456,
    longitud: -79.1623,
    categoria: 'entretenimiento',
    imagenes: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&crop=center'
    ],
    rating: 4.6,
    numReviews: 456,
    direccion: 'Av. Chone y Esmeraldas',
    telefono: '+593 2 275 4567',
    horario: '09:00 - 20:00',
    precio: 8.0,
    etiquetas: ['Familia', 'Diversión', 'Niños', 'Atracciones'],
    provincia: 'Santo Domingo de los Tsáchilas',
    canton: 'Santo Domingo'
  }
];

async function poblarBaseDatos() {
  try {
    console.log('🗑️  Limpiando base de datos...');
    await Lugar.deleteMany({});
    
    console.log('📦 Insertando lugares de ejemplo...');
    await Lugar.insertMany(lugaresEjemplo);
    
    console.log('✅ Base de datos poblada exitosamente!');
    console.log(`📊 ${lugaresEjemplo.length} lugares agregados`);
    
    // Mostrar resumen
    const total = await Lugar.countDocuments();
    console.log(`📈 Total en base de datos: ${total} lugares`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error poblando la base de datos:', error);
    process.exit(1);
  }
}

poblarBaseDatos();