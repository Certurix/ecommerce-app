#!/bin/bash
# Build script for the ecommerce application

set -e  # Exit on any error

echo "🚀 Building ecommerce-app for production..."

# Build the main application
echo "📦 Building main application container..."
docker build -t ecommerce-app:latest .

# Optionally build individual services
if [ "$1" = "--separate" ]; then
    echo "📦 Building frontend container..."
    docker build -t ecommerce-frontend:latest ./frontend
    
    echo "📦 Building backend container..."
    docker build -t ecommerce-backend:latest ./backend
fi

echo "✅ Build completed successfully!"

# Show built images
echo "📋 Built images:"
docker images | grep ecommerce

echo ""
echo "🔧 To run the application:"
echo "  Development: docker-compose up"
echo "  Production:  docker-compose -f docker-compose.prod.yml up"
echo ""
echo "🌐 To deploy with Coolify:"
echo "  1. Push your changes to your git repository"
echo "  2. Create a new service in Coolify"
echo "  3. Point it to your repository"
echo "  4. Configure environment variables using .env.production as template"
echo "  5. Deploy!"