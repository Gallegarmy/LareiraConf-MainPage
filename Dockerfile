# Multi-stage Dockerfile para despliegue de Astro (output server con @astrojs/node)
# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app
# Instalar dependencias
COPY package*.json ./
RUN npm ci
# Copiar código fuente
COPY . .
# Construir (genera dist/)
RUN npm run build

# Etapa de runtime mínima
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Crear usuario no-root (opcional)
RUN addgroup -S astro && adduser -S astro -G astro
USER astro

# Instalar dependencias sólo producción
COPY --chown=astro:astro package*.json ./
RUN npm ci --only=production

# Copiar artefactos de build
COPY --from=build --chown=astro:astro /app/dist ./dist
COPY --from=build --chown=astro:astro /app/astro.config.mjs ./astro.config.mjs

# Variables de entorno (definir en docker run / compose / Jenkins, NO copiar .env)
# ENV GOOGLE_SHEETS_ID=
# ENV GOOGLE_CLIENT_ID=
# ENV GOOGLE_CLIENT_SECRET=
# ENV GOOGLE_REFRESH_TOKEN=

EXPOSE 4321

# Healthcheck simple (puedes cambiar la ruta si expones otra)
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:4321 || exit 1

CMD ["node", "dist/server/entry.mjs"]
