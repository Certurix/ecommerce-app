# Frontend Dockerfile - Multi-stage build with build script
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with retry logic
RUN for i in 1 2 3; do npm install && break || sleep 30; done

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage - serve built files
FROM nginx:alpine AS production

# Copy built files to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]