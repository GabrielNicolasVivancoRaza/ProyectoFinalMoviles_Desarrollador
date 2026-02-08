const express = require('express');
const router = express.Router();
const Lugar = require('../models/Lugar');

// Endpoint de salud para verificar que la API funciona
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'API funcionando correctamente'
  });
});

// API pública para la app Flutter
// Obtener todos los lugares activos
router.get('/lugares', async (req, res) => {
  try {
    console.log('📍 GET /api/lugares - Iniciando consulta');
    const { categoria, provincia, canton, precioMin, precioMax, search } = req.query;
    console.log('🔍 Parámetros:', { categoria, provincia, canton, precioMin, precioMax, search });
    
    let query = { activo: true };
    
    // Filtros
    if (categoria && categoria !== 'todos') {
      query.categoria = categoria;
    }
    
    if (provincia) {
      query.provincia = provincia;
    }
    
    if (canton) {
      query.canton = canton;
    }
    
    if (precioMin || precioMax) {
      query.precio = {};
      if (precioMin) query.precio.$gte = parseFloat(precioMin);
      if (precioMax) query.precio.$lte = parseFloat(precioMax);
    }
    
    if (search) {
      query.$or = [
        { nombre: { $regex: search, $options: 'i' } },
        { descripcion: { $regex: search, $options: 'i' } },
        { etiquetas: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    console.log('🔎 Query MongoDB:', JSON.stringify(query));
    const lugares = await Lugar.find(query).sort({ rating: -1, fechaCreacion: -1 });
    console.log(`✅ Lugares encontrados: ${lugares.length}`);
    
    // Formatear datos para Flutter (igual al modelo LugarEntity)
    const lugaresFormateados = lugares.map(lugar => ({
      id: lugar._id.toString(),
      nombre: lugar.nombre,
      descripcion: lugar.descripcion,
      latitud: lugar.latitud,
      longitud: lugar.longitud,
      categoria: lugar.categoria,
      imagenes: lugar.imagenes || [],
      rating: lugar.rating || 0,
      numReviews: lugar.numReviews || 0,
      direccion: lugar.direccion,
      telefono: lugar.telefono || '',
      horario: lugar.horario || '',
      precio: lugar.precio || 0,
      etiquetas: lugar.etiquetas || [],
      provincia: lugar.provincia,
      canton: lugar.canton
    }));
    
    res.json(lugaresFormateados);
    console.log('📤 Respuesta enviada exitosamente');
  } catch (error) {
    console.error('❌ Error al obtener lugares:', error);
    console.error('📍 Stack:', error.stack);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: error.message 
    });
  }
});

// Obtener lugar por ID
router.get('/lugares/:id', async (req, res) => {
  try {
    const lugar = await Lugar.findById(req.params.id);
    
    if (!lugar || !lugar.activo) {
      return res.status(404).json({ error: 'Lugar no encontrado' });
    }
    
    // Formatear para Flutter
    const lugarFormateado = {
      id: lugar._id.toString(),
      nombre: lugar.nombre,
      descripcion: lugar.descripcion,
      latitud: lugar.latitud,
      longitud: lugar.longitud,
      categoria: lugar.categoria,
      imagenes: lugar.imagenes || [],
      rating: lugar.rating || 0,
      numReviews: lugar.numReviews || 0,
      direccion: lugar.direccion,
      telefono: lugar.telefono || '',
      horario: lugar.horario || '',
      precio: lugar.precio || 0,
      etiquetas: lugar.etiquetas || [],
      provincia: lugar.provincia,
      canton: lugar.canton
    };
    
    res.json(lugarFormateado);
  } catch (error) {
    console.error('Error al obtener lugar:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener lugares recomendados
router.get('/recomendaciones', async (req, res) => {
  try {
    const { lat, lng, categoria } = req.query;
    
    let query = { activo: true };
    
    if (categoria && categoria !== 'todos') {
      query.categoria = categoria;
    }
    
    // Por ahora retornamos lugares con mejor rating
    // Aquí se podría implementar lógica más compleja basada en ubicación
    const lugares = await Lugar.find(query)
      .sort({ rating: -1 })
      .limit(10);
    
    const lugaresFormateados = lugares.map(lugar => ({
      id: lugar._id.toString(),
      nombre: lugar.nombre,
      descripcion: lugar.descripcion,
      latitud: lugar.latitud,
      longitud: lugar.longitud,
      categoria: lugar.categoria,
      imagenes: lugar.imagenes || [],
      rating: lugar.rating || 0,
      numReviews: lugar.numReviews || 0,
      direccion: lugar.direccion,
      telefono: lugar.telefono || '',
      horario: lugar.horario || '',
      precio: lugar.precio || 0,
      etiquetas: lugar.etiquetas || [],
      provincia: lugar.provincia,
      canton: lugar.canton
    }));
    
    res.json(lugaresFormateados);
  } catch (error) {
    console.error('Error al obtener recomendaciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Estadísticas para la app (opcional)
router.get('/stats', async (req, res) => {
  try {
    const totalLugares = await Lugar.countDocuments({ activo: true });
    const lugaresCategoria = await Lugar.aggregate([
      { $match: { activo: true } },
      { $group: { _id: '$categoria', count: { $sum: 1 } } }
    ]);
    
    res.json({
      total: totalLugares,
      categorias: lugaresCategoria
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;