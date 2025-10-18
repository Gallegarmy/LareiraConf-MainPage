FROM node:20-alpine AS build
WORKDIR /app

# Debug: mostrar entorno npm relevante
RUN echo "== ENV (npm-related) ==" && env | grep -i npm || true

# Forzar registry público explícito
ENV NPM_CONFIG_REGISTRY=https://registry.npmjs.org/

# Copiar manifests
COPY package*.json ./

# Debug: inspeccionar .npmrc (home y workdir) antes de instalar
RUN echo "== ls -al /root ==" && ls -al /root; \
    echo "== /root/.npmrc (si existe) =="; \
    if [ -f /root/.npmrc ]; then sed 's/_authToken=.*/_authToken=[REDACTED]/' /root/.npmrc; else echo "no /root/.npmrc"; fi; \
    echo "== /app/.npmrc (si existe) =="; \
    if [ -f /app/.npmrc ]; then sed 's/_authToken=.*/_authToken=[REDACTED]/' /app/.npmrc; else echo "no /app/.npmrc"; fi; \
    echo "== npm config list =="; npm config list; \
    echo "== npm config get registry =="; npm config get registry

# Limpieza defensiva de credenciales heredadas
RUN npm config delete //registry.npmjs.org/:_authToken || true; \
    rm -f /root/.npmrc || true; \
    rm -f /app/.npmrc || true

# Mostrar config tras limpieza
RUN echo "== AFTER CLEANUP npm config list =="#; npm config list

# Instalación (sólo después de depurar)
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build
RUN npm prune --omit=dev
