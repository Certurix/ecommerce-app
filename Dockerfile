# Multi-stage build for the full-stack application
# This Dockerfile builds both frontend and serves it from the backend

# Frontend build stage
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install frontend dependencies with retry
RUN for i in 1 2 3; do npm install && break || sleep 30; done

# Copy frontend source
COPY frontend/ ./

# Build frontend
RUN npm run build

# Backend build stage  
FROM node:20-alpine AS backend-builder

WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install backend dependencies with retry
RUN for i in 1 2 3; do npm install && break || sleep 30; done

# Copy backend source
COPY backend/ ./

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy backend package files and install production dependencies
COPY backend/package*.json ./
RUN for i in 1 2 3; do npm install --production && break || sleep 30; done && npm cache clean --force

# Copy backend source code
COPY --from=backend-builder /app/backend/src ./src

# Copy built frontend files
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1))" || exit 1

# Expose port
EXPOSE 5000

# Start the backend server
CMD ["node", "src/server.js"]
