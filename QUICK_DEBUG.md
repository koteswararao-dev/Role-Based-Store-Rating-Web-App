# 🚨 Quick Backend Debug

## Step 1: Test Backend URLs

**Copy and paste these URLs into your browser:**

1. **Root URL:**
   ```
   https://roxiler-backend.onrender.com/
   ```
   **Expected:** JSON response with server info
   **If you get:** Error page or nothing → Backend not deployed properly

2. **API URL:**
   ```
   https://roxiler-backend.onrender.com/api
   ```
   **Expected:** JSON with API endpoints
   **If you get:** 404 → Routing issue

## Step 2: Check Render Dashboard

1. Go to https://render.com/dashboard
2. Find your `roxiler-backend` service
3. Check the **Status** - should be "Live" (green)
4. Click on the service → Check **Logs** tab
5. Look for any error messages

## Step 3: Common Issues & Solutions

### Issue: "Service Unavailable" or timeout
**Solution:** Render free tier services sleep after 15 minutes. First request wakes them up (takes 30-60 seconds).

### Issue: 404 on all endpoints
**Solution:** Deployment failed. Check Render logs for errors.

### Issue: Backend works but auth routes don't
**Solution:** Missing files or import errors. Check logs.

## Step 4: If Backend is Working

If the URLs above work, then update your Netlify environment variable:

1. Go to Netlify dashboard
2. Site settings → Environment variables
3. Edit `REACT_APP_API_URL`
4. Set to: `https://roxiler-backend.onrender.com/api`
5. Redeploy your site

## Step 5: Test Credentials

Once everything is working, use these test accounts:

- **Admin:** admin@test.com / Admin123!
- **Owner:** owner@test.com / Owner123!
- **User:** user@test.com / User123!

---

**Tell me what happens when you test the URLs above!**