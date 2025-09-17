#!/bin/bash
# Enhanced build script for the ecommerce application

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Building ecommerce-app for production...${NC}"

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker first."
    exit 1
fi

print_status "Docker is running"

# Clean up previous builds if requested
if [ "$1" = "--clean" ]; then
    print_warning "Cleaning up previous builds..."
    docker system prune -f
    sudo rm -rf frontend/dist || true
fi

# Build frontend locally first (to avoid Docker networking issues)
print_status "Building frontend locally..."
cd frontend
npm install
npm run build
cd ..

print_status "Frontend built successfully"

# Build the main application container
print_status "Building main application container..."
docker build -t ecommerce-app:latest .

# Build individual services if requested
if [ "$1" = "--separate" ] || [ "$2" = "--separate" ]; then
    print_status "Building individual service containers..."
    
    print_status "Building frontend container..."
    docker build -t ecommerce-frontend:latest ./frontend
    
    print_status "Building backend container..."
    docker build -t ecommerce-backend:latest ./backend
fi

print_status "Build completed successfully!"

# Show built images
echo -e "${BLUE}📋 Built images:${NC}"
docker images | grep ecommerce

echo ""
print_status "Build Summary:"
echo "📦 Main application: ecommerce-app:latest"
if [ "$1" = "--separate" ] || [ "$2" = "--separate" ]; then
    echo "📦 Frontend service: ecommerce-frontend:latest"  
    echo "📦 Backend service: ecommerce-backend:latest"
fi

echo ""
echo -e "${BLUE}🔧 To run the application:${NC}"
echo "  Development: docker-compose up"
echo "  Production:  docker-compose -f docker-compose.prod.yml up"
echo ""
echo -e "${BLUE}🌐 To deploy with Coolify:${NC}"
echo "  1. Push your changes to your git repository"
echo "  2. Create a new service in Coolify"
echo "  3. Point it to your repository"
echo "  4. Configure environment variables using .env.production as template"
echo "  5. Deploy!"
echo ""
echo -e "${BLUE}📚 For detailed deployment instructions, see DOCKER_DEPLOYMENT.md${NC}"