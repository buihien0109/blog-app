# Stage 1: Build React application
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Create production environment
FROM --platform=amd64 nginx:alpine
WORKDIR /app
COPY --from=build /app/dist /app
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
