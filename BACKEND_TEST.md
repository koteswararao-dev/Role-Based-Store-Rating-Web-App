# Backend Testing Guide

## 🧪 Test Your Render Backend

### Step 1: Test Basic Health
Open these URLs in your browser:

1. **Root endpoint:**
   ```
   https://roxiler-backend.onrender.com/
   ```
   Expected: JSON with server info

2. **API info:**
   ```
   https://roxiler-backend.onrender.com/api
   ```
   Expected: JSON with API endpoints

3. **Health check:**
   ```
   https://roxiler-backend.onrender.com/api/health
   ```
   Expected: JSON with health status

### Step 2: Test Auth Endpoints
Use a tool like Postman or curl:

**Test Signup:**
```bash
curl -X POST https://roxiler-backend.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User Account Name Here",
    "email": "test@example.com",
    "password": "Test123!",
    "address": "123 Test Street"
  }'
```

**Test Login:**
```bash
curl -X POST https://roxiler-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "Admin123!"
  }'
```

### Step 3: Check Render Logs
1. Go to Render dashboard
2. Click your `roxiler-backend` service
3. Check **Logs** tab for errors

### Step 4: Update Netlify Environment Variable
If backend is working, update Netlify:

1. Go to Netlify → Site settings → Environment variables
2. Edit `REACT_APP_API_URL`
3. Set to: `https://roxiler-backend.onrender.com/api`
4. Redeploy site

## 🔧 Troubleshooting

### If you get 404 errors:
- Check Render deployment logs
- Verify all files were deployed
- Check if service is sleeping (free tier)

### If you get 500 errors:
- Check database connection
- Check environment variables on Render
- Check server logs

### If CORS errors return:
- Verify your Netlify URL is correct
- Check backend CORS configuration