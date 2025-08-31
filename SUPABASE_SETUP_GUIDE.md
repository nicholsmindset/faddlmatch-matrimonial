# Supabase Staging Migration Guide

## Step 1: Deploy Staging Branch to Vercel

```bash
# Make sure you're on staging branch
git checkout staging/supabase-migration

# Deploy to Vercel (create new deployment)
npx vercel --prod
# Choose "Link to existing project?" → No
# Project name: faddlmatch-staging
# Directory: ./
# Override settings? → No
```

## Step 2: Configure Environment Variables in Vercel

Go to Vercel Dashboard → faddlmatch-staging → Settings → Environment Variables

Add these variables (replace with your actual Supabase values):

```bash
# Database
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# Auth (generate new secret)
AUTH_SECRET="staging-secret-$(openssl rand -hex 32)"
NEXTAUTH_URL="https://faddlmatch-staging.vercel.app"

# Copy these from your current production .env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="faddalmatch2025"
NEXT_PUBLIC_CLOUDINARY_API_KEY="875358283458345"
CLOUDINARY_API_SECRET="JdEhdhEqKjVLZHZcNN4Okr8VGXY"
NEXT_PUBLIC_PUSHER_APP_KEY="910a208b0a777db709ab"
PUSHER_APP_ID="2044379"
PUSHER_SECRET="e12dccbd14b66ab91b0c"
PUSHER_CLUSTER="ap1"
RESEND_API_KEY="re_ME8qbyFW_3pp7qNMNKsSAA6mG96cZx7a5"
SENTRY_DSN="https://ba3f9941e583a25c84cf7a15bf1ad8e2@o4509937390452736.ingest.de.sentry.io/4509937402576976"

# App Config
NEXT_PUBLIC_BASE_URL="https://faddlmatch-staging.vercel.app"
NODE_ENV="production"
ALLOWED_ORIGINS="https://faddlmatch-staging.vercel.app"
```

## Step 3: Run Database Migration

```bash
# Trigger a redeploy to run migrations
npx vercel --prod

# Or manually run migration if needed:
npx prisma migrate deploy
```

## Step 4: Test Key Features

### Authentication Testing
1. Visit staging URL
2. Test email/password registration
3. Test login/logout flow
4. Verify profile creation

### Core Features Testing
1. **Profile Creation**: Complete profile setup with photos
2. **Member Discovery**: Browse other members
3. **Matching System**: Like/dislike functionality
4. **Messaging**: Send and receive messages
5. **Photo Management**: Upload and manage photos
6. **Real-time Features**: Test Pusher messaging

### Performance Testing
1. Check page load times
2. Test image uploads (Cloudinary)
3. Verify database queries are fast
4. Test responsive design

## Step 5: Data Migration (if needed)

If you have existing production data to migrate:

```bash
# Export from current database
npx prisma db pull
npx prisma generate

# Import to Supabase (manual process)
# You may need to export/import user data carefully
```

## Step 6: Validation Checklist

- [ ] Staging deployment successful
- [ ] Database migrations completed
- [ ] Authentication working (email/password)
- [ ] User registration flow complete
- [ ] Profile creation and editing
- [ ] Photo upload functionality
- [ ] Member browsing and filtering
- [ ] Like/match system working
- [ ] Real-time messaging active
- [ ] All pages load without errors
- [ ] Mobile responsiveness intact
- [ ] Performance acceptable (<3s load)

## Step 7: Production Migration

Only after all staging tests pass:

```bash
# Merge staging to main
git checkout main
git merge staging/supabase-migration

# Deploy to production
npx vercel --prod

# Update production environment variables
# Run production migration
```

## Troubleshooting

### Common Issues:
1. **Build failures**: Check environment variables are set correctly
2. **Database connection**: Verify DATABASE_URL format
3. **Auth issues**: Ensure AUTH_SECRET is generated and NEXTAUTH_URL is correct
4. **Missing features**: Verify all required environment variables are copied

### Support:
- Supabase docs: https://supabase.com/docs
- Prisma migration guide: https://www.prisma.io/docs/guides/migrate
- Vercel deployment: https://vercel.com/docs