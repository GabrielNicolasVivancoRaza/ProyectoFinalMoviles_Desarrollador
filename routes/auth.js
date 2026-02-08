const express = require('express');
const router = express.Router();

// Credenciales del admin (en producción usar hash)
const ADMIN_CREDENTIALS = {
  usuario: 'admin',
  password: 'admin123'
};

// Middleware para verificar autenticación
const requireAuth = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: 'No autenticado' });
  }
};

// Login
router.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  if (usuario === ADMIN_CREDENTIALS.usuario && password === ADMIN_CREDENTIALS.password) {
    req.session.isAdmin = true;
    req.session.adminUser = usuario;
    
    res.json({ 
      success: true, 
      message: 'Login exitoso',
      redirect: '/admin/dashboard'
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Credenciales incorrectas' 
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: 'Error al cerrar sesión' });
    } else {
      res.json({ success: true, message: 'Sesión cerrada' });
    }
  });
});

// Verificar estado de autenticación
router.get('/status', (req, res) => {
  res.json({ 
    authenticated: !!req.session.isAdmin,
    user: req.session.adminUser || null
  });
});

module.exports = router;