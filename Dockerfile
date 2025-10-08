FROM node:18-alpine AS build
WORKDIR /app

# Copy backend only (this Dockerfile is for backend service)
COPY backend/package.json backend/
COPY backend/src backend/src

WORKDIR /app/backend
RUN npm install --production

CMD ["node", "src/index.js"]
