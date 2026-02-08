const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vivanco_turismo';
const SESSION_SECRET = process.env.SESSION_SECRET || 'vivanco-turismo-secret-key';
const NODE_ENV = process.env.NODE_ENV || 'development';

// MongoDB connection
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ Conectado a MongoDB');
});

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session configuration
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGODB_URI
  }),
  cookie: {
    secure: NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
  }
}));

// Import routes
const authRoutes = require('./routes/auth');
const lugaresRoutes = require('./routes/lugares');
const apiRoutes = require('./routes/api');

// Routes
app.use('/auth', authRoutes);
app.use('/admin', lugaresRoutes);
app.use('/api', apiRoutes);

// Home page redirect
app.get('/', (req, res) => {
  if (req.session.isAdmin) {
    res.redirect('/admin/dashboard');
  } else {
    res.redirect('/login.html');
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`🌍 Entorno: ${NODE_ENV}`);
  console.log(`📱 API: /api/lugares`);
  console.log(`⚙️  Panel Admin: /login.html`);
  
  if (NODE_ENV === 'development') {
    console.log(`🏠 Local: http://localhost:${PORT}`);
    console.log(`📱 Red local: http://192.168.1.14:${PORT}`);
  }
});