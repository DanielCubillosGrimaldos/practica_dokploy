# dokploy-practica

Aplicación Express.js de la práctica de **Administración de Contenedores con Dokploy**
(Administración de Infraestructura de TI, Universidad del Quindío).

| Ruta      | Descripción                                                   |
|-----------|---------------------------------------------------------------|
| `/`       | Mensaje de bienvenida (muestra `APP_NAME` y `APP_VERSION`)    |
| `/health` | Estado y uptime                                               |
| `/info`   | Versión de Node, arquitectura, memoria y hostname del contenedor |
| `/db`     | Prueba de conexión a MySQL con las variables `DB_*`           |

## Variables de entorno

`PORT`, `NODE_ENV`, `APP_NAME`, `APP_VERSION`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`.
Se configuran en Dokploy (pestaña *Environment*); no se guardan en el repositorio.

## Archivos

- `Dockerfile`: opcional, para comparar el build `Dockerfile` contra `Nixpacks`.
- `docker-compose.yml` + `.env.example`: stack multi-servicio de la Fase 5.

## Ejecución local

```bash
npm install
npm start
curl http://localhost:3000/health
```
