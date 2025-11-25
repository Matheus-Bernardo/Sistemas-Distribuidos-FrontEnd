### Multi-stage Dockerfile for Angular app
### Stage 1: build with Node
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies (use package-lock or npm-shrinkwrap when present)
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --silent; else npm install --silent; fi

# Copy all sources and build
COPY . ./
RUN npm run build -- --configuration production

### Stage 2: serve with nginx
FROM nginx:stable-alpine AS production

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/angular17-app /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

