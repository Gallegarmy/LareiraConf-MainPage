FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build
# Quitar dependencias de dev para runtime
RUN npm prune --omit=dev

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S astro && adduser -S astro -G astro
USER astro
COPY --chown=astro:astro package*.json ./
COPY --from=build --chown=astro:astro /app/node_modules ./node_modules
COPY --from=build --chown=astro:astro /app/dist ./dist
COPY --from=build --chown=astro:astro /app/astro.config.mjs ./astro.config.mjs
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
