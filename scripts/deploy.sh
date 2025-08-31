#!/bin/bash

# Production deployment script for Match Me app
set -e

echo "🚀 Starting Match Me deployment..."

# Configuration
APP_NAME="matchme-app"
DOCKER_IMAGE="ghcr.io/your-username/match-me:latest"
ENV_FILE=".env.production"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   log_error "This script should not be run as root for security reasons"
   exit 1
fi

# Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed or not in PATH"
    exit 1
fi

if ! docker info &> /dev/null; then
    log_error "Docker daemon is not running"
    exit 1
fi

# Check if environment file exists
if [[ ! -f "$ENV_FILE" ]]; then
    log_error "Environment file $ENV_FILE not found"
    log_info "Please create $ENV_FILE based on .env.example"
    exit 1
fi

# Backup current deployment
log_info "Creating backup of current deployment..."
if docker ps -q -f name=$APP_NAME; then
    docker commit $APP_NAME ${APP_NAME}-backup-$(date +%Y%m%d-%H%M%S) || true
fi

# Pull latest image
log_info "Pulling latest Docker image..."
docker pull $DOCKER_IMAGE

# Stop and remove existing container
log_info "Stopping existing application..."
if docker ps -q -f name=$APP_NAME; then
    docker stop $APP_NAME
fi

if docker ps -aq -f name=$APP_NAME; then
    docker rm $APP_NAME
fi

# Run database migrations
log_info "Running database migrations..."
docker run --rm \
    --env-file $ENV_FILE \
    --network host \
    $DOCKER_IMAGE \
    npx prisma migrate deploy

# Seed database if needed (only for fresh deployments)
if [[ "${1:-}" == "--seed" ]]; then
    log_warn "Seeding database with initial data..."
    docker run --rm \
        --env-file $ENV_FILE \
        --network host \
        $DOCKER_IMAGE \
        npx prisma db seed
fi

# Start new container
log_info "Starting new application container..."
docker run -d \
    --name $APP_NAME \
    --env-file $ENV_FILE \
    --restart unless-stopped \
    --network host \
    $DOCKER_IMAGE

# Wait for application to start
log_info "Waiting for application to start..."
sleep 10

# Health check
log_info "Performing health check..."
max_attempts=30
attempt=1

while [[ $attempt -le $max_attempts ]]; do
    if curl -f http://localhost:3000/api/health &> /dev/null; then
        log_info "✅ Application is healthy!"
        break
    fi
    
    if [[ $attempt -eq $max_attempts ]]; then
        log_error "❌ Health check failed after $max_attempts attempts"
        log_error "Rolling back to previous version..."
        
        # Rollback procedure
        docker stop $APP_NAME || true
        docker rm $APP_NAME || true
        
        # Try to restart backup if it exists
        BACKUP_IMAGE=$(docker images -q ${APP_NAME}-backup-* | head -n1)
        if [[ ! -z "$BACKUP_IMAGE" ]]; then
            docker run -d --name $APP_NAME --env-file $ENV_FILE --restart unless-stopped --network host $BACKUP_IMAGE
            log_info "Rolled back to previous version"
        fi
        
        exit 1
    fi
    
    log_info "Attempt $attempt/$max_attempts - waiting..."
    sleep 2
    ((attempt++))
done

# Cleanup old images (keep last 3)
log_info "Cleaning up old Docker images..."
docker images ${APP_NAME}-backup-* -q | tail -n +4 | xargs -r docker rmi || true

log_info "🎉 Deployment completed successfully!"
log_info "Application is running on http://localhost:3000"
log_info "Health check: http://localhost:3000/api/health"