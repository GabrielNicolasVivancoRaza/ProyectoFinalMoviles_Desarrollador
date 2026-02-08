# 🚀 DESPLIEGUE EN RAILWAY - PASO A PASO

## ✅ Backend preparado para Railway

### 📋 PASO 1: Crear base de datos en MongoDB Atlas

1. **Crear cuenta gratuita:**
   - Ve a: https://www.mongodb.com/cloud/atlas
   - Registrate con Google o email

2. **Crear un Cluster (base de datos):**
   - Click en "Build a Database"
   - Selecciona **FREE** (M0 Sandbox)
   - Elige región más cercana (ej: AWS - N. Virginia)
   - Click "Create Cluster"

3. **Configurar acceso:**
   - **Usuario de base de datos:**
     - Username: `vivancouser`
     - Password: `vivanco2024` (guárdalo!)
     - Click "Create User"
   
   - **IP Whitelist:**
     - Click "Add IP Address"
     - Click "Allow Access from Anywhere" (0.0.0.0/0)
     - Click "Confirm"

4. **Obtener String de Conexión:**
   - Click en "Connect" en tu cluster
   - Selecciona "Connect your application"
   - Copia la URL (se ve así):
     ```
     mongodb+srv://vivancouser:<password>@cluster0.xxxxx.mongodb.net/vivanco_turismo?retryWrites=true&w=majority
     ```
   - **Importante:** Reemplaza `<password>` con `vivanco2024`
   - Ejemplo final:
     ```
     mongodb+srv://vivancouser:vivanco2024@cluster0.xxxxx.mongodb.net/vivanco_turismo?retryWrites=true&w=majority
     ```

---

## 📦 PASO 2: Subir código a GitHub (opcional pero recomendado)

1. **Inicializar Git en la carpeta desarrollador:**
   ```bash
   cd desarrollador
   git init
   git add .
   git commit -m "Preparado para Railway"
   ```

2. **Crear repositorio en GitHub:**
   - Ve a: https://github.com/new
   - Nombre: `vivanco-turismo-backend`
   - Público o Privado
   - NO inicialices con README
   - Click "Create repository"

3. **Subir código:**
   ```bash
   git remote add origin https://github.com/TU_USUARIO/vivanco-turismo-backend.git
   git branch -M main
   git push -u origin main
   ```

---

## 🚂 PASO 3: Desplegar en Railway

1. **Crear cuenta en Railway:**
   - Ve a: https://railway.app/
   - Click "Start a New Project"
   - Inicia sesión con GitHub

2. **Crear nuevo proyecto:**
   - Click "New Project"
   - Selecciona "Deploy from GitHub repo" (si subiste a GitHub)
   - O selecciona "Empty Project" y luego "Add Service" → "GitHub Repo"

3. **Configurar variables de entorno:**
   - Click en tu servicio
   - Ve a la pestaña "Variables"
   - Añade las siguientes variables:

   ```
   MONGODB_URI = mongodb+srv://vivancouser:vivanco2024@cluster0.xxxxx.mongodb.net/vivanco_turismo?retryWrites=true&w=majority
   
   SESSION_SECRET = mi-secreto-super-seguro-2024
   
   NODE_ENV = production
   
   PORT = 8080
   ```

4. **Desplegar:**
   - Railway detectará automáticamente que es Node.js
   - Click en "Deploy" o espera el autodeploy
   - Espera 2-3 minutos

5. **Obtener URL pública:**
   - Ve a "Settings"
   - Busca "Generate Domain"
   - Click en el botón
   - Te dará una URL como: `https://vivanco-turismo-production.up.railway.app`
   - **¡GUARDA ESTA URL!** La necesitarás para Flutter

---

## 🗄️ PASO 4: Poblar la base de datos

1. **Modificar populate-db.js para usar MongoDB Atlas:**
   - Abre `populate-db.js`
   - Cambia la conexión a tu URL de MongoDB Atlas

2. **Ejecutar localmente y poblar la base en la nube:**
   ```bash
   node populate-db.js
   ```

---

## 📱 PASO 5: Actualizar Flutter

**Guarda la URL de Railway**, ejemplo:
```
https://vivanco-turismo-production.up.railway.app
```

Ahora ve al siguiente paso...

---

## ✅ Listo para producción!

Tu backend ya está:
- ✅ Accesible desde internet
- ✅ Con base de datos en la nube
- ✅ Listo para conectar con Flutter
- ✅ Gratuito (Railway da $5 USD/mes gratis)

---

## 🔧 Alternativa rápida SIN GitHub:

Si NO quieres usar GitHub:

1. En Railway, selecciona "Empty Project"
2. Click "New" → "Database" → "Add MongoDB"
3. Railway creará una MongoDB automáticamente
4. Copia la `MONGO_URL` de las variables
5. Sube tu código usando Railway CLI:
   ```bash
   npm i -g @railway/cli
   railway login
   railway link
   railway up
   ```

---

## 📞 Soporte

Si tienes problemas:
- Railway Docs: https://docs.railway.app/
- MongoDB Atlas Docs: https://www.mongodb.com/docs/atlas/
