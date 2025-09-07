# Use official Node.js LTS image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app
COPY . .

# Build the Astro app
RUN npm run build

# -------------------------
# Production image
FROM node:20-alpine

WORKDIR /app

# Install a lightweight server to serve the build (astro preview)
RUN npm install -g astro

# Copy build output and config
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/astro.config.mjs ./astro.config.mjs

# Expose the port
ENV PORT=8080
EXPOSE 8080

# Start the Astro preview server
CMD ["astro", "preview", "--port", "8080", "--host"]

