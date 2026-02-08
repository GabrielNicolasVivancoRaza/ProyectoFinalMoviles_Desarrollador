@echo off
echo ==========================================
echo  🏝️  VIVANCO TURISMO - SETUP COMPLETO  🏝️
echo ==========================================
echo.

echo 📦 Instalando dependencias de Node.js...
call npm install

echo.
echo 🔧 Verificando instalación de MongoDB...
where mongod >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  MongoDB no está instalado o no está en el PATH
    echo 📥 Descarga MongoDB desde: https://www.mongodb.com/try/download/community
    echo 📊 Descarga MongoDB Compass desde: https://www.mongodb.com/products/compass
    pause
) else (
    echo ✅ MongoDB está instalado
)

echo.
echo 🎯 Configuración completada!
echo.
echo 📋 INSTRUCCIONES DE USO:
echo.
echo 1️⃣  Asegúrate de que MongoDB esté ejecutándose
echo 2️⃣  Ejecuta: npm start
echo 3️⃣  Abre tu navegador en: http://localhost:3000/login.html
echo 4️⃣  Usuario: admin, Contraseña: admin123
echo 5️⃣  Modifica tu app Flutter para usar: http://localhost:3000/api
echo.
echo 🚀 ¿Deseas iniciar el servidor ahora? (S/N)
set /p choice="Respuesta: "
if /i "%choice%"=="S" (
    echo.
    echo 🌟 Iniciando servidor...
    npm start
) else (
    echo.
    echo ✋ Para iniciar el servidor más tarde, ejecuta: npm start
    pause
)