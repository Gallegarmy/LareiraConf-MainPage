# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa de runtime mínima
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -S astro && adduser -S astro -G astro
USER astro

COPY --chown=astro:astro package*.json ./
RUN npm ci --omit=dev --unsafe-perm

COPY --from=build --chown=astro:astro /app/dist ./dist
COPY --from=build --chown=astro:astro /app/astro.config.mjs ./astro.config.mjs

EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
