# 🚀 Deployment Guide - Roxiler Store Rating System

## Free Hosting Options

### Option 1: Render (Recommended - Easiest)
### Option 2: Railway
### Option 3: Vercel (Frontend) + Render (Backend)

---

## 🎯 Option 1: Render (RECOMMENDED)

**Why Render?**
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Supports both frontend and backend
- ✅ SQLite database works out of the box
- ✅ Easy setup

### Step-by-Step Deployment on Render

#### A. Prepare Your Code

1. **Create GitHub Repository**
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Roxiler Store Rating System"

# Create repository on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/roxiler-store-rating.git
git branch -M main
git push -u origin main
```

#### B. Deploy Backend on Render

1. **Go to:** https://render.com
2. **Sign up** with GitHub
3. **Click "New +"** → **"Web Service"**
4. **Connect your repository**
5. **Configure:**
   - **Name:** `roxiler-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

6. **Add Environment Variables:**
   - `PORT` = `5000`
   - `JWT_SECRET` = `your-super-secret-key-change-this`
   - `NODE_ENV` = `production`

7. **Click "Create Web Service"**
8. **Wait for deployment** (5-10 minutes)
9. **Copy your backend URL:** `https://roxiler-backend.onrender.com`

#### C. Deploy Frontend on Render

1. **Click "New +"** → **"Static Site"**
2. **Connect same repository**
3. **Configure:**
   - **Name:** `roxiler-frontend`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `build`

4. **Add Environment Variable:**
   - `REACT_APP_API_URL` = `https://roxiler-backend.onrender.com/api`

5. **Click "Create Static Site"**
6. **Wait for deployment**
7. **Your app is live!** `https://roxiler-frontend.onrender.com`

---

## 🎯 Option 2: Railway

**Why Railway?**
- ✅ Very easy deployment
- ✅ Free $5 credit per month
- ✅ Automatic HTTPS
- ✅ Great for full-stack apps

### Step-by-Step Deployment on Railway

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **Click "New Project"** → **"Deploy from GitHub repo"**
4. **Select your repository**

#### Deploy Backend:
1. **Add service** → **Select backend folder**
2. **Add environment variables:**
   ```
   PORT=5000
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   ```
3. **Railway will auto-detect and deploy**
4. **Generate domain** → Copy backend URL

#### Deploy Frontend:
1. **Add service** → **Select frontend folder**
2. **Add environment variable:**
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app/api
   ```
3. **Generate domain** → Your app is live!

---

## 🎯 Option 3: Vercel + Render

### Backend on Render (Same as Option 1)

### Frontend on Vercel

1. **Go to:** https://vercel.com
2. **Sign up** with GitHub
3. **Click "Add New"** → **"Project"**
4. **Import your repository**
5. **Configure:**
   - **Framework Preset:** `Create React App`
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

6. **Add Environment Variable:**
   - `REACT_APP_API_URL` = `https://your-backend-url.onrender.com/api`

7. **Click "Deploy"**
8. **Your app is live!**

---

## 📝 Pre-Deployment Checklist

### 1. Update package.json files

**Backend package.json** - Add:
```json
{
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}
```

**Frontend package.json** - Already has build script

### 2. Create .env files

**Backend .env:**
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
```

**Frontend .env:**
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

### 3. Update CORS in backend

Already configured to accept all origins in development. For production, update `backend/app.js`:

```javascript
const cors = require('cors');

// Allow your frontend domain
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```

---

## 🔧 Deployment Configuration Files

### Create these files in your project root:

#### 1. render.yaml (for Render)
```yaml
services:
  - type: web
    name: roxiler-backend
    env: node
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: PORT
        value: 5000
      - key: JWT_SECRET
        generateValue: true
      - key: NODE_ENV
        value: production

  - type: web
    name: roxiler-frontend
    env: static
    buildCommand: cd frontend && npm install && npm run build
    staticPublishPath: frontend/build
    envVars:
      - key: REACT_APP_API_URL
        value: https://roxiler-backend.onrender.com/api
```

#### 2. vercel.json (for Vercel frontend)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## 🎯 Quick Deploy Commands

### For Render (using CLI):
```bash
# Install Render CLI
npm install -g render-cli

# Login
render login

# Deploy
render deploy
```

### For Railway (using CLI):
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### For Vercel (using CLI):
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy frontend
cd frontend
vercel --prod
```

---

## 🧪 Test Your Deployed App

1. **Visit your frontend URL**
2. **Try to signup** (create test user)
3. **Login** with test credentials
4. **Test all features:**
   - Admin dashboard
   - User store browsing
   - Owner store management
   - Rating submission

---

## 🔍 Troubleshooting Deployment

### Backend Issues:

**Problem:** Database not persisting
- **Solution:** Render free tier resets filesystem. Use persistent storage or upgrade.

**Problem:** CORS errors
- **Solution:** Update CORS origin in `backend/app.js` to your frontend URL

**Problem:** Environment variables not working
- **Solution:** Double-check spelling and restart service

### Frontend Issues:

**Problem:** API calls failing
- **Solution:** Check `REACT_APP_API_URL` is correct and includes `/api`

**Problem:** Build fails
- **Solution:** Run `npm run build` locally first to check for errors

**Problem:** Blank page after deployment
- **Solution:** Check browser console for errors, verify build output

---

## 📊 Deployment Comparison

| Platform | Backend | Frontend | Database | Free Tier | Ease |
|----------|---------|----------|----------|-----------|------|
| **Render** | ✅ | ✅ | ✅ SQLite | 750 hrs/mo | ⭐⭐⭐⭐⭐ |
| **Railway** | ✅ | ✅ | ✅ SQLite | $5 credit | ⭐⭐⭐⭐ |
| **Vercel** | ❌ | ✅ | ❌ | Unlimited | ⭐⭐⭐ |
| **Heroku** | ✅ | ✅ | ⚠️ Addon | Limited | ⭐⭐⭐ |

**Recommendation:** Use **Render** for easiest deployment!

---

## 🎉 After Deployment

### 1. Update README with live links
```markdown
## 🌐 Live Demo

- **Frontend:** https://roxiler-frontend.onrender.com
- **Backend API:** https://roxiler-backend.onrender.com/api
```

### 2. Test credentials for demo
```
Admin: admin@test.com / Admin123!
Owner: owner@test.com / Owner123!
User: user@test.com / User123!
```

### 3. Share your project
- Add to your resume
- Share on LinkedIn
- Include in portfolio
- Submit to Roxiler

---

## 🚀 You're Done!

Your Roxiler Store Rating System is now:
- ✅ Deployed and live
- ✅ Accessible from anywhere
- ✅ Ready to showcase
- ✅ Ready to submit

**Congratulations!** 🎉
