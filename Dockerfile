
FROM node:20-alpine AS builder

WORKDIR /app


COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:20-alpine

WORKDIR /app

RUN npm install -g astro


COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/astro.config.mjs ./astro.config.mjs


ENV PORT=8080
EXPOSE 8080


CMD ["astro", "preview", "--port", "8080", "--host"]

