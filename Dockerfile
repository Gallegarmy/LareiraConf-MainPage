# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app

# Copiar y configurar credenciales de npm
ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc

# Copiar y instalar dependencias
COPY package*.json ./
RUN npm ci --no-audit --no-fund && rm -f .npmrc

# Copiar el resto de los archivos y construir la aplicación
COPY . .
RUN npm run build

# Etapa de runtime mínima
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Crear y usar un usuario no root
RUN addgroup -S astro && adduser -S astro -G astro

# Cambiar permisos del directorio para el usuario no root
COPY --chown=astro:astro package*.json ./
RUN chown -R astro:astro /app

USER astro

# Copiar dependencias de producción
RUN npm ci --omit=dev --no-audit --no-fund

# Copiar los archivos necesarios desde la etapa de build
COPY --from=build --chown=astro:astro /app/dist ./dist
COPY --from=build --chown=astro:astro /app/astro.config.mjs ./astro.config.mjs

# Exponer el puerto y definir el comando de inicio
EXPOSE 4321

# Forzar que Node escuche en todas las interfaces
ENV HOST=0.0.0.0

CMD ["node", "dist/server/entry.mjs"]
