FROM node:18-alpine AS build
WORKDIR /app

COPY backend/package*.json ./
RUN npm install --production --no-audit --no-fund

COPY backend/ ./

CMD ["node", "src/index.js"]
