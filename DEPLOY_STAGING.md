# 🚀 Quick Staging Deployment Instructions

## 1. Deploy to Vercel Staging

```bash
# Make sure you're on the staging branch
git checkout staging/supabase-migration

# Deploy to Vercel (create new staging environment)
npx vercel --prod
```

**When prompted:**
- Link to existing project? → **No**
- Project name → `faddlmatch-staging`
- Directory → `.` (default)
- Override settings? → **No**

## 2. Add Environment Variables

Go to **Vercel Dashboard** → **faddlmatch-staging** → **Settings** → **Environment Variables**

Copy and paste these (I've filled in your Supabase credentials):

```env
DATABASE_URL="postgresql://postgres:[YOUR-DB-PASSWORD]@db.hzebcalhbjbxvcrurvzn.supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://hzebcalhbjbxvcrurvzn.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6ZWJjYWxoYmpieHZjcnVydnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MjAxMTEsImV4cCI6MjA2OTA5NjExMX0.u-EEytMAEHrzG_g14hOlolPCXbaOQxYXcxaetWQmVKo"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6ZWJjYWxoYmpieHZjcnVydnpuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzUyMDExMSwiZXhwIjoyMDY5MDk2MTExfQ.sL6jFYkdgZc8WIAQ1Fz_-HaNNgsiS2oI7khVWpisHvg"
AUTH_SECRET="staging-secret-$(openssl rand -hex 32)"
NEXTAUTH_URL="https://faddlmatch-staging.vercel.app"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="faddalmatch2025"
NEXT_PUBLIC_CLOUDINARY_API_KEY="875358283458345"
CLOUDINARY_API_SECRET="JdEhdhEqKjVLZHZcNN4Okr8VGXY"
NEXT_PUBLIC_PUSHER_APP_KEY="910a208b0a777db709ab"
PUSHER_APP_ID="2044379"
PUSHER_SECRET="e12dccbd14b66ab91b0c"
PUSHER_CLUSTER="ap1"
RESEND_API_KEY="re_ME8qbyFW_3pp7qNMNKsSAA6mG96cZx7a5"
SENTRY_DSN="https://ba3f9941e583a25c84cf7a15bf1ad8e2@o4509937390452736.ingest.de.sentry.io/4509937402576976"
NEXT_PUBLIC_BASE_URL="https://faddlmatch-staging.vercel.app"
NODE_ENV="production"
ALLOWED_ORIGINS="https://faddlmatch-staging.vercel.app"
```

⚠️ **Important**: You need to replace `[YOUR-DB-PASSWORD]` with your actual Supabase database password from your project settings.

## 3. Get Database Password

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your `faddlmatch-staging` project
3. Settings → Database → Database password
4. Use that password to replace `[YOUR-DB-PASSWORD]` in the DATABASE_URL above

## 4. Redeploy with Environment Variables

```bash
# Trigger a redeploy to apply env vars
npx vercel --prod
```

## 5. Test Your Staging Site

Visit: **https://faddlmatch-staging.vercel.app**

### Quick Test Checklist:
- [ ] Site loads successfully
- [ ] Can register a new account
- [ ] Can log in with email/password
- [ ] Profile creation works
- [ ] Photo upload functions (Cloudinary)
- [ ] Member browsing works
- [ ] Like/match system functions
- [ ] Messaging system works (Pusher)
- [ ] No console errors

## 6. If All Tests Pass ✅

```bash
# Merge to main and deploy production
git checkout main
git merge staging/supabase-migration
git push origin main
```

Then update your production Vercel with the same environment variables!

---

**Status**: Ready for staging deployment 🚀
**Branch**: `staging/supabase-migration`
**Next**: Deploy and test, then merge to production