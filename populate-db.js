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