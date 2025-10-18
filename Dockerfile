# Etapa de runtime mínima
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -S astro && adduser -S astro -G astro
USER astro

COPY --chown=astro:astro package*.json ./
RUN npm ci --omit=dev

COPY --from=build --chown=astro:astro /app/dist ./dist
COPY --from=build --chown=astro:astro /app/astro.config.mjs ./astro.config.mjs

EXPOSE 4321

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://localhost:4321 || exit 1

CMD ["node", "dist/server/entry.mjs"]
