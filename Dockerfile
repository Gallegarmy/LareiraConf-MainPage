
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first 
COPY package*.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -S astro && adduser -S astro -G astro

COPY --chown=astro:astro package*.json ./

COPY --from=build --chown=astro:astro /app/dist ./dist
COPY --from=build --chown=astro:astro /app/astro.config.mjs ./astro.config.mjs

USER astro

EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
