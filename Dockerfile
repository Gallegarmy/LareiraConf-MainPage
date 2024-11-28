# Use a Node.js base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Astro project
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Serve the built app using a static server
CMD ["npx", "serve", "./dist", "-l", "8080"]
