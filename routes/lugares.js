const express = require('express');
const router = express.Router();
const Lugar = require('../models/Lugar');

// Middleware para verificar autenticación
const requireAuth = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect('/login.html');
  }
};

// Dashboard principal
router.get('/dashboard', requireAuth, (req, res) => {
  res.sendFile('dashboard.html', { root: 'public' });
});

// Gestión de lugares
router.get('/lugares', requireAuth, (req, res) => {
  res.sendFile('lugares.html', { root: 'public' });
});

// API para el panel admin
router.get('/api/lugares', requireAuth, async (req, res) => {
  try {
    const lugares = await Lugar.find({ activo: true }).sort({ fechaCreacion: -1 });
    res.json(lugares);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/api/lugares', requireAuth, async (req, res) => {
  try {
    const nuevoLugar = new Lugar(req.body);
    const lugarGuardado = await nuevoLugar.save();
    res.status(201).json(lugarGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/api/lugares/:id', requireAuth, async (req, res) => {
  try {
    const lugar = await Lugar.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!lugar) {
      return res.status(404).json({ error: 'Lugar no encontrado' });
    }
    
    res.json(lugar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/api/lugares/:id', requireAuth, async (req, res) => {
  try {
    const lugar = await Lugar.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );
    
    if (!lugar) {
      return res.status(404).json({ error: 'Lugar no encontrado' });
    }
    
    res.json({ message: 'Lugar desactivado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;