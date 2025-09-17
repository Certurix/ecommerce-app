# Docker Deployment Guide for Coolify

This guide explains how to deploy the ecommerce-app using Docker and Coolify.

## Overview

The application has been containerized using Docker with optimized multi-stage builds:

- **Frontend**: React/Vite application served by nginx
- **Backend**: Node.js/Express API with health checks
- **Database**: MySQL 8.0 with proper initialization

## Project Structure

```
ecommerce-app/
├── frontend/
│   ├── Dockerfile          # Frontend multi-stage build
│   ├── nginx.conf          # Production nginx configuration
│   └── .dockerignore       # Frontend build exclusions
├── backend/
│   ├── Dockerfile          # Backend multi-stage build
│   └── .dockerignore       # Backend build exclusions
├── Dockerfile              # Full-stack application build
├── docker-compose.yml      # Development environment
├── docker-compose.prod.yml # Production environment
├── coolify.yml             # Coolify configuration
├── .env.production         # Environment template
├── build.sh               # Build script
└── deploy.sh              # Deployment script
```

## Quick Start

### 1. Local Development

```bash
# Start development environment
docker-compose up

# Or use the build script
./build.sh
```

Services will be available at:
- Frontend: http://localhost:5173 (dev server)
- Backend: http://localhost:5000
- Database: localhost:3306

### 2. Production Deployment

```bash
# Build and deploy production environment
cp .env.production .env
# Configure your environment variables in .env
./deploy.sh
```

The production app will be available at: http://localhost:5000

## Coolify Deployment

### Prerequisites

1. Coolify instance running
2. Git repository access
3. Domain name (optional)

### Deployment Steps

1. **Create New Service in Coolify**
   - Service Type: `Docker Compose`
   - Source: Your git repository
   - Branch: `main` (or your preferred branch)

2. **Configure Environment Variables**
   
   Copy the variables from `.env.production` and configure them in Coolify:
   
   ```env
   # Database Configuration
   DB_NAME=ecommerce
   DB_USER=ecommerce
   DB_PASSWORD=your_secure_password
   DB_HOST=db
   DB_PORT=3306
   DB_DIALECT=mysql
   DB_ROOT_PASSWORD=your_root_password
   
   # Application Configuration
   NODE_ENV=production
   PORT=5000
   ```

3. **Configure Docker Compose File**
   
   Coolify will use `docker-compose.prod.yml` for production deployment.

4. **Deploy**
   
   Click "Deploy" in Coolify. The deployment will:
   - Build the frontend and backend containers
   - Set up the MySQL database
   - Configure networking between services
   - Start health checks
   - Serve the application

## Docker Images

### Frontend Image
- **Base**: nginx:alpine
- **Build**: Multi-stage with Node.js for building React/Vite app
- **Security**: Static file serving with optimized nginx config
- **Size**: ~25MB (optimized)

### Backend Image  
- **Base**: node:20-alpine
- **Security**: Non-root user (nodejs:nodejs)
- **Health Check**: Built-in API endpoint `/api/health`
- **Size**: ~150MB (with dependencies)

### Full-Stack Image
- **Combines**: Frontend and backend in single container
- **Serves**: Frontend static files from backend Express server
- **Use Case**: Simplified deployments, single container solutions

## Configuration Files

### nginx.conf (Frontend)
- Optimized for React Router (SPA)
- Gzip compression enabled
- Security headers included
- Static asset caching

### docker-compose.prod.yml
- Production-ready configuration
- Health checks for all services
- Proper restart policies
- Volume persistence for database
- Environment variable support

### coolify.yml
- Coolify-specific configuration
- Port mappings
- Health check definitions
- Volume specifications

## Database Initialization

The MySQL container automatically runs the initialization script:
- Location: `backend/model.sql`
- Creates tables and initial schema
- Sets up user permissions

## Health Checks

All services include health checks:

- **Backend**: `GET /api/health` returns `{"status":"ok","timestamp":"..."}`
- **Frontend**: nginx status
- **Database**: mysqladmin ping

## Security Features

- Non-root user in production containers
- Minimal attack surface with Alpine Linux
- Environment variable configuration
- Secrets management support
- Network isolation between services

## Monitoring

Access logs and monitoring through:

```bash
# View all service logs
docker-compose -f docker-compose.prod.yml logs -f

# View specific service logs
docker-compose -f docker-compose.prod.yml logs -f app
docker-compose -f docker-compose.prod.yml logs -f db

# Check service health
docker-compose -f docker-compose.prod.yml ps
```

## Troubleshooting

### Build Issues
- Check network connectivity for npm installs
- Verify Node.js/npm versions
- Clear Docker cache: `docker system prune -a`

### Runtime Issues
- Check environment variables
- Verify database connectivity
- Review health check endpoints
- Check container logs

### Coolify Issues
- Verify git repository access
- Check Coolify logs
- Validate environment variable configuration
- Ensure proper port mappings

## Scaling

The architecture supports horizontal scaling:

- Frontend: Multiple nginx instances behind load balancer
- Backend: Multiple API instances with shared database
- Database: Read replicas or clustering setup

## Backup and Recovery

Database backup strategy:

```bash
# Create backup
docker-compose -f docker-compose.prod.yml exec db mysqldump -u root -p ecommerce > backup.sql

# Restore backup
docker-compose -f docker-compose.prod.yml exec -T db mysql -u root -p ecommerce < backup.sql
```

## Performance Optimization

- Multi-stage builds minimize image sizes
- nginx serves static files efficiently  
- Database connection pooling configured
- Health checks prevent traffic to unhealthy containers
- Gzip compression for frontend assets

## Development vs Production

| Feature | Development | Production |
|---------|-------------|------------|
| Frontend | Vite dev server (hot reload) | nginx (static files) |
| Backend | nodemon (auto-restart) | node (stable) |
| Database | Development data | Persistent volumes |
| Build | Development dependencies | Production only |
| Security | Relaxed | Hardened containers |

This deployment pipeline provides a production-ready, scalable, and maintainable solution for deploying the ecommerce application using modern Docker practices and Coolify orchestration.