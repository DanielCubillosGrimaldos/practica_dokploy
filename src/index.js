const express = require('express');
const mysql = require('mysql2/promise');
const os = require('os');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        mensaje: '¡Actualización automática con Dokploy! (v2.0.0)',
        institucion: 'Universidad del Quindío',
        programa: 'Ingeniería de Sistemas y Computación',
        curso: 'Administración de Infraestructura de TI',
        plataforma: 'Dokploy PaaS',
        app: process.env.APP_NAME || 'sin-definir',
        version: process.env.APP_VERSION || '1.0.0',
        fecha: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        estado: 'saludable',
        uptime: process.uptime(),
        version: process.version,
        plataforma: 'Dokploy'
    });
});

app.get('/info', (req, res) => {
    res.json({
        node_version: process.version,
        platform: process.platform,
        arch: process.arch,
        hostname: os.hostname(),
        memory: {
            total: Math.round(os.totalmem() / 1024 / 1024) + ' MB',
            free: Math.round(os.freemem() / 1024 / 1024) + ' MB'
        }
    });
});

// Prueba de conexión a MySQL con las variables DB_* (Fase 4, paso 4.3)
app.get('/db', async (req, res) => {
    if (!process.env.DB_HOST) {
        return res.status(503).json({
            estado: 'sin configurar',
            detalle: 'Faltan las variables DB_* en la pestaña Environment'
        });
    }
    let conn;
    try {
        conn = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || 3306),
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectTimeout: 3000
        });
        const [rows] = await conn.query('SELECT VERSION() AS version, NOW() AS ahora');
        res.json({ estado: 'conectado', base_de_datos: process.env.DB_NAME, ...rows[0] });
    } catch (err) {
        res.status(503).json({ estado: 'error', detalle: err.code || err.message });
    } finally {
        if (conn) await conn.end().catch(() => {});
    }
});

const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en puerto ${port}`);
    console.log(`Plataforma: Dokploy PaaS`);
});

// Docker envía SIGTERM al redesplegar; sin esto el contenedor tarda ~10 s en detenerse
process.on('SIGTERM', () => server.close(() => process.exit(0)));
