# Vivanco Turismo - Panel de Administración

Sistema de administración web para gestionar lugares turísticos que consume la aplicación Flutter de Vivanco Turismo.

## 🚀 Características

- **Panel de Login**: Autenticación con credenciales admin/admin123
- **Dashboard**: Estadísticas y métricas de lugares turísticos
- **Gestión de Lugares**: CRUD completo para lugares turísticos
- **API REST**: Endpoints para la aplicación Flutter
- **Base de datos MongoDB**: Almacenamiento persistente

## 📋 Prerrequisitos

- Node.js (v16 o superior)
- MongoDB (MongoDB Compass recomendado)
- NPM o Yarn

## 🛠️ Instalación

1. **Instalar MongoDB**:
   - Descargar e instalar MongoDB Community Server
   - Instalar MongoDB Compass (interfaz gráfica)

2. **Configurar el proyecto**:
   ```bash
   cd desarrollador
   npm install
   ```

3. **Iniciar MongoDB**:
   - Asegúrate de que MongoDB esté ejecutándose en `mongodb://localhost:27017`

4. **Ejecutar la aplicación**:
   ```bash
   npm start
   ```

   O para desarrollo con auto-reload:
   ```bash
   npm run dev
   ```

## 🌐 Acceso

- **Panel Admin**: http://localhost:3000/login.html
- **Dashboard**: http://localhost:3000/admin/dashboard
- **API Flutter**: http://localhost:3000/api/lugares

### Credenciales de Acceso
- **Usuario**: admin
- **Contraseña**: admin123

## 📡 API Endpoints

### Para la App Flutter
- `GET /api/lugares` - Obtener todos los lugares
- `GET /api/lugares/:id` - Obtener lugar específico
- `GET /api/recomendaciones` - Obtener lugares recomendados
- `GET /api/stats` - Estadísticas generales

### Para el Panel Admin
- `POST /auth/login` - Iniciar sesión
- `POST /auth/logout` - Cerrar sesión
- `GET /admin/api/lugares` - Listar lugares (requiere auth)
- `POST /admin/api/lugares` - Crear lugar (requiere auth)
- `PUT /admin/api/lugares/:id` - Actualizar lugar (requiere auth)
- `DELETE /admin/api/lugares/:id` - Eliminar lugar (requiere auth)

## 💾 Base de Datos

### Colección: lugares
```javascript
{
  _id: ObjectId,
  nombre: String,
  descripcion: String,
  latitud: Number,
  longitud: Number,
  categoria: String, // 'hotel', 'restaurante', 'cultura', 'naturaleza', 'entretenimiento'
  imagenes: [String],
  rating: Number,
  numReviews: Number,
  direccion: String,
  telefono: String,
  horario: String,
  precio: Number,
  etiquetas: [String],
  provincia: String,
  canton: String,
  activo: Boolean,
  fechaCreacion: Date,
  fechaActualizacion: Date
}
```

## 🔧 Configuración Flutter

Para que tu app Flutter consuma esta API, actualiza la URL base en tu `TurismoApiDataSource`:

```dart
class TurismoApiDataSource {
  static const String baseUrl = 'http://localhost:3000/api';
  
  // Rest of your implementation...
}
```

## 📱 Integración con Flutter

1. El formato de datos coincide exactamente con tu `LugarEntity`
2. La API devuelve datos en el formato esperado por tu app
3. Soporte para filtros por categoría, precio, ubicación y búsqueda
4. Sistema de recomendaciones integrado

## 🔄 Flujo de Trabajo

1. **Admin** agrega lugares desde el panel web
2. **Datos** se almacenan en MongoDB
3. **API** sirve los datos en formato JSON
4. **App Flutter** consume la API y muestra los lugares
5. **Usuarios** ven lugares dinámicos en la aplicación

## 📞 Soporte

Para problemas o dudas:
- Revisar logs del servidor
- Verificar conexión a MongoDB
- Comprobar que el puerto 3000 esté disponible

## 🚦 Estados del Servicio

- ✅ MongoDB conectado
- ✅ Servidor ejecutándose en puerto 3000
- ✅ API endpoints disponibles
- ✅ Panel admin accesible