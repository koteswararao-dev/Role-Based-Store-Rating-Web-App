# Netlify Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. Backend Status
- [ ] Backend deployed on Render: `https://roxiler-backend.onrender.com`
- [ ] Test backend URL in browser (should not show "site not found")

### 2. Frontend Configuration
- [x] API URL configured in `frontend/.env`
- [x] `_redirects` file exists in `frontend/public/`
- [x] API service uses `process.env.REACT_APP_API_URL`

## 🚀 Deploy to Netlify

### Step 1: Push Latest Code
```bash
git add .
git commit -m "Configure frontend for Netlify deployment"
git push
```

### Step 2: Create Netlify Site
1. Go to https://www.netlify.com
2. Login with GitHub
3. Click **Add new site** → **Import an existing project**
4. Choose **GitHub**
5. Select repository: `koteswararao-dev/Role-Based-Store-Rating-Web-App`

### Step 3: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Base directory** | `frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | `build` |

### Step 4: Add Environment Variable

In Netlify → **Site settings** → **Environment variables**

Add this variable:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://roxiler-backend.onrender.com/api` |

### Step 5: Deploy
Click **Deploy site** and wait 1-2 minutes.

## 🎉 Final URLs

- **Frontend**: `https://your-site-name.netlify.app`
- **Backend**: `https://roxiler-backend.onrender.com`

## 🧪 Test Your Deployment

1. Open your Netlify URL
2. Try to signup/login
3. Test all features (Admin, Owner, User dashboards)

## 🔧 Troubleshooting

### Issue: API calls failing
- Check if backend URL is correct in Netlify environment variables
- Verify backend is running on Render
- Check browser console for CORS errors

### Issue: 404 on page refresh
- Verify `_redirects` file exists in `frontend/public/`
- Content should be: `/*    /index.html   200`

### Issue: Build fails on Netlify
- Check build logs
- Verify `package.json` has correct scripts
- Ensure all dependencies are listed

## 📝 Test Credentials

Use these credentials to test your deployed app:

**Admin:**
- Email: `admin@roxiler.com`
- Password: `Admin@123`

**Owner:**
- Email: `owner@store.com`
- Password: `Owner@123`

**User:**
- Email: `user@test.com`
- Password: `User@123`
