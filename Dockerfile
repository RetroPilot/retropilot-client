FROM node:16-alpine AS builder

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci

ARG PUBLIC_URL
ENV PUBLIC_URL $PUBLIC_URL
ARG API_URL
ENV API_URL $API_URL

# Build the app
COPY . .
RUN npm run build

FROM nginx:1.20-alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
