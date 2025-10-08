### Frontend multi-stage Dockerfile (production)
FROM node:18-alpine AS build
WORKDIR /app

# Install deps
COPY frontend/package*.json ./
RUN npm install --no-audit --no-fund

# Copy sources and build
COPY frontend/ ./
RUN npm run build

FROM nginx:stable-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
