FROM node:16-alpine AS builder

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Build the app
COPY . .
RUN npm run build

FROM nginx:1.20-alpine AS server

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
