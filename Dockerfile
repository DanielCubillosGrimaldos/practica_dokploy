# Opcional: sirve para comparar Build Type "Dockerfile" vs "Nixpacks" (pregunta de análisis 2).
# Con Build Type = Nixpacks en Dokploy este archivo se ignora.
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "src/index.js"]
