const mongoose = require('mongoose');
const Lugar = require('./models/Lugar');
require('dotenv').config();

// Conectar a MongoDB (usa MONGODB_URI del .env o localhost por defecto)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vivanco_turismo';

if (!process.env.MONGODB_URI) {
  console.log('⚠️  MONGODB_URI no encontrada, usando MongoDB local');
}

console.log('🔌 Conectando a:', MONGODB_URI.includes('mongodb+srv') ? 'MongoDB Atlas (Nube)' : 'MongoDB Local');
console.log('📍 URI:', MONGODB_URI.substring(0, 30) + '...');

mongoose.connect(MONGODB_URI);

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
    longitud: -79.1550,
    categoria: 'naturaleza',
    imagenes: [
      'https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800&h=600&fit=crop&crop=center'
    ],
    rating: 4.8,
    numReviews: 892,
    direccion: 'Km 7 vía Quevedo',
    telefono: '+593 2 275 8901',
    horario: '08:00 - 17:00',
    precio: 5.0,
    etiquetas: ['Naturaleza', 'Senderos', 'Fotografía', 'Aventura'],
    provincia: 'Santo Domingo de los Tsáchilas',
    canton: 'Santo Domingo'
  },
  {
    nombre: 'Museo Tsáchila',
    descripcion: 'Centro cultural que preserva y exhibe la historia de la nacionalidad Tsáchila',
    latitud: -0.2450,
    longitud: -79.1820,
    categoria: 'cultura',
    imagenes: [
      'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&h=600&fit=crop&crop=center'
    ],
    rating: 4.6,
    numReviews: 445,
    direccion: 'Comuna Chigüilpe',
    telefono: '+593 2 275 2234',
    horario: '09:00 - 16:00',
    precio: 3.0,
    etiquetas: ['Cultura', 'Historia', 'Educativo', 'Indígena'],
    provincia: 'Santo Domingo de los Tsáchilas',
    canton: 'Santo Domingo'
  },
  {
    nombre: 'Parque Acuático La Isla',
    descripcion: 'Diversión familiar con toboganes, piscinas y áreas recreativas',
    latitud: -0.2530,
    longitud: -79.1650,
    categoria: 'entretenimiento',
    imagenes: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=800&h=600&fit=crop&crop=center'
    ],
    rating: 4.4,
    numReviews: 1203,
    direccion: 'Vía Chone Km 2',
    telefono: '+593 2 275 6789',
    horario: '10:00 - 18:00',
    precio: 8.0,
    etiquetas: ['Familia', 'Diversión', 'Niños', 'Piscinas'],
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