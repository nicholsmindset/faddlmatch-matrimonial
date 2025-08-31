# 🚀 Match Me Production Deployment Guide

Complete production deployment setup for the Match Me dating application.

## 📋 Prerequisites

### System Requirements
- **Docker** & **Docker Compose** installed
- **Node.js** 18+ (for local development)
- **PostgreSQL** 15+ database
- **Redis** 7+ (optional, for caching)

### Required Services
- **Cloudinary** account for image uploads
- **Pusher** account for real-time messaging  
- **Resend** account for email delivery
- **Sentry** account for error monitoring (optional)
- **Domain** and **SSL certificate**

## 🔧 Environment Setup

### 1. Clone and Configure
```bash
git clone https://github.com/YourUsername/match-me.git
cd match-me
cp .env.example .env.production
```

### 2. Configure Environment Variables
Edit `.env.production` with your production values:

```bash
# Required: Database
DATABASE_URL="postgresql://user:password@localhost:5432/matchme_prod"

# Required: Authentication
AUTH_SECRET="your-super-secure-random-string-here"
NEXTAUTH_URL="https://yourdomain.com"

# Required: Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Required: Pusher
NEXT_PUBLIC_PUSHER_APP_KEY="your-pusher-key"
PUSHER_APP_ID="your-pusher-app-id"
PUSHER_SECRET="your-pusher-secret"
PUSHER_CLUSTER="us2"

# Required: Email
RESEND_API_KEY="your-resend-api-key"

# Optional: OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Optional: Monitoring
SENTRY_DSN="your-sentry-dsn"
GOOGLE_ANALYTICS_ID="GA-XXXXXXXXX"
```

## 🐳 Docker Deployment

### Option 1: Docker Compose (Recommended)
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

### Option 2: Manual Docker Build
```bash
# Build image
docker build -t match-me .

# Run with environment file
docker run -d \
  --name match-me-app \
  --env-file .env.production \
  -p 3000:3000 \
  match-me
```

## 🔄 Automated Deployment Script

Use the included deployment script for zero-downtime deployments:

```bash
# Make script executable
chmod +x scripts/deploy.sh

# Deploy (with health checks)
./scripts/deploy.sh

# Deploy with database seeding (first time only)
./scripts/deploy.sh --seed
```

## 🏗️ Manual Deployment Steps

### 1. Database Setup
```bash
# Run migrations
npx prisma migrate deploy

# Seed database (first deployment)
npx prisma db seed
```

### 2. Application Build
```bash
# Install dependencies
npm ci --only=production

# Generate Prisma client
npx prisma generate

# Build application
npm run build

# Start application
npm start
```

### 3. Nginx Configuration
Copy `nginx/nginx.conf` to your nginx configuration and restart nginx:

```bash
sudo cp nginx/nginx.conf /etc/nginx/sites-available/match-me
sudo ln -s /etc/nginx/sites-available/match-me /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔍 Health Checks & Monitoring

### Application Health
```bash
# Check application health
curl http://localhost:3000/api/health

# Check metrics (admin only)
curl http://localhost:3000/api/metrics
```

### Database Health
```bash
# Connect to database
docker exec -it matchme-postgres psql -U matchme_user -d matchme_db

# Check database status
\l
\dt
SELECT COUNT(*) FROM "User";
```

## 🔒 Security Checklist

- [ ] SSL certificate configured
- [ ] Environment variables secured
- [ ] Database password is strong
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] File upload restrictions in place
- [ ] Error messages don't expose sensitive info

## 📊 Performance Optimization

### Database Optimization
```sql
-- Add database indexes for better performance
CREATE INDEX IF NOT EXISTS idx_member_gender ON "Member"(gender);
CREATE INDEX IF NOT EXISTS idx_member_date_of_birth ON "Member"("dateOfBirth");
CREATE INDEX IF NOT EXISTS idx_message_recipient ON "Message"("recipientId");
CREATE INDEX IF NOT EXISTS idx_message_sender ON "Message"("senderId");
```

### Monitoring Setup
- Configure Sentry error tracking
- Set up Google Analytics
- Monitor server resources
- Track application metrics

## 🚨 Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear build cache
rm -rf .next node_modules
npm install
npm run build
```

**Database Connection:**
```bash
# Check database connectivity
docker exec matchme-postgres pg_isready
```

**Permission Issues:**
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

**Memory Issues:**
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
```

## 📝 Maintenance

### Regular Tasks
- **Weekly**: Check application logs
- **Weekly**: Monitor error rates in Sentry
- **Monthly**: Update dependencies
- **Monthly**: Review performance metrics
- **Quarterly**: Security audit

### Backup Strategy
```bash
# Database backup
docker exec matchme-postgres pg_dump -U matchme_user matchme_db > backup-$(date +%Y%m%d).sql

# Image backup (if using local storage)
tar -czf images-backup-$(date +%Y%m%d).tar.gz public/uploads/
```

### Updates
```bash
# Pull latest changes
git pull origin main

# Run deployment script
./scripts/deploy.sh
```

## 🔗 Production URLs

- **Application**: https://yourdomain.com
- **Health Check**: https://yourdomain.com/api/health
- **Admin Metrics**: https://yourdomain.com/api/metrics

## 📞 Support

For deployment issues:
1. Check application logs: `docker logs matchme-app`
2. Check nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Monitor health endpoint: `/api/health`
4. Review error tracking in Sentry

---

**🎉 Congratulations!** Your Match Me dating app is now production-ready with enterprise-grade deployment, monitoring, and security features.