#!/bin/bash
# Deployment script for production

set -e

echo "🚀 Deploying ecommerce-app to production..."

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "❌ .env.production file not found!"
    echo "Please copy .env.production template and configure your environment variables"
    exit 1
fi

# Source environment variables
set -a
source .env.production
set +a

echo "🔍 Pre-deployment checks..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Pull latest images if needed
echo "📥 Pulling latest base images..."
docker pull node:22-alpine
docker pull mysql:8.0
docker pull nginx:alpine

# Build the application
echo "🔨 Building application..."
docker-compose -f docker-compose.prod.yml build --no-cache

# Start the services
echo "🚀 Starting services..."
docker-compose -f docker-compose.prod.yml down  # Stop existing containers
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if services are healthy
echo "🔍 Checking service health..."
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up (healthy)"; then
    echo "✅ Deployment successful!"
    echo ""
    echo "🌐 Application is running at: http://localhost:5000"
    echo "📊 Database is accessible at: localhost:3306"
    echo ""
    echo "📋 Useful commands:"
    echo "  View logs: docker-compose -f docker-compose.prod.yml logs -f"
    echo "  Stop services: docker-compose -f docker-compose.prod.yml down"
    echo "  Restart services: docker-compose -f docker-compose.prod.yml restart"
else
    echo "❌ Some services are not healthy. Check logs:"
    docker-compose -f docker-compose.prod.yml logs
    exit 1
fi