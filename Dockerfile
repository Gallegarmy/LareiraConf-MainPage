FROM node:lts
WORKDIR /app

# Forzar registro público de npm
RUN npm config set registry https://registry.npmjs.org/

COPY . .

RUN npm install
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
