# Troubleshooting Guide

## Login Not Working

### Step 1: Check if Backend is Running

Open a terminal and run:
```bash
cd backend
npm start
```

You should see:
```
SQLite database connected successfully
Database synchronized
Server running on port 5000
```

### Step 2: Test Database Connection

Run the test script to verify database and create test users:
```bash
cd backend
node test-db.js
```

This will:
- Connect to the database
- Show existing users
- Create test users if none exist

### Step 3: Verify Frontend is Running

Open another terminal:
```bash
cd frontend
npm start
```

Frontend should open at `http://localhost:3000`

### Step 4: Create a User First

If the database is empty, you need to **signup first** before you can login:

1. Go to `http://localhost:3000/signup`
2. Fill in the form with valid data:
   - **Name:** At least 20 characters (e.g., "Admin User Test Account")
   - **Email:** Valid email format
   - **Password:** 8-16 chars, 1 uppercase, 1 special char (e.g., "Admin123!")
   - **Address:** Optional
   - **Role:** Select admin/owner/user
3. Click "Sign Up"
4. You'll be redirected to login page
5. Now login with the credentials you just created

### Step 5: Test Login with Test Users

If you ran `node test-db.js`, you can login with:

**Admin:**
- Email: `admin@test.com`
- Password: `Admin123!`

**Owner:**
- Email: `owner@test.com`
- Password: `Owner123!`

**User:**
- Email: `user@test.com`
- Password: `User123!`

---

## Common Errors

### "Invalid credentials"
- **Cause:** Wrong email or password
- **Solution:** 
  - Make sure you created the user first via signup
  - Check for typos in email/password
  - Passwords are case-sensitive

### "Email already registered"
- **Cause:** This email already exists in database
- **Solution:** 
  - Use a different email for signup
  - Or login with existing credentials

### "Name must be between 20 and 60 characters"
- **Cause:** Name is too short
- **Solution:** Use a longer name (e.g., "John Doe Smith Anderson")

### "Password must contain at least one uppercase letter"
- **Cause:** Password has no capital letters
- **Solution:** Add at least one uppercase letter (e.g., "Password123!")

### "Password must contain at least one special character"
- **Cause:** Password has no special characters
- **Solution:** Add one of: !@#$%^&* (e.g., "Password123!")

### Network Error / Cannot connect
- **Cause:** Backend server not running
- **Solution:** 
  1. Open terminal in backend folder
  2. Run `npm start`
  3. Wait for "Server running on port 5000"

### CORS Error
- **Cause:** Frontend and backend on different ports
- **Solution:** Backend already has CORS enabled, but verify:
  - Backend: `http://localhost:5000`
  - Frontend: `http://localhost:3000`

---

## Reset Everything

If nothing works, start fresh:

### 1. Stop all servers
- Press `Ctrl+C` in both terminal windows

### 2. Delete database
```bash
cd backend
del database.sqlite  # Windows
# or
rm database.sqlite   # Mac/Linux
```

### 3. Restart backend
```bash
cd backend
npm start
```

### 4. Create test users
```bash
cd backend
node test-db.js
```

### 5. Restart frontend
```bash
cd frontend
npm start
```

### 6. Try logging in
Go to `http://localhost:3000/login` and use test credentials

---

## Check Browser Console

Open browser DevTools (F12) and check:

### Console Tab
Look for errors like:
- Network errors
- CORS errors
- JavaScript errors

### Network Tab
1. Try to login
2. Check the `/api/auth/login` request
3. Look at:
   - **Status Code:** Should be 200 for success, 401 for wrong credentials
   - **Response:** Shows the error message
   - **Request Payload:** Shows what data was sent

---

## Backend Logs

Check the terminal where backend is running for errors:
- Database connection errors
- Route errors
- Authentication errors

---

## Quick Test with cURL

Test backend directly:

### Test Signup:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User Account Name\",\"email\":\"test@test.com\",\"password\":\"Test123!\",\"role\":\"user\"}"
```

### Test Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@test.com\",\"password\":\"Test123!\"}"
```

If these work, the backend is fine and the issue is in the frontend.

---

## Still Not Working?

1. Check that you're using the correct ports:
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

2. Verify `.env` file in backend:
   ```
   PORT=5000
   JWT_SECRET=your-secret-key
   ```

3. Verify `.env` file in frontend:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Clear browser cache and localStorage:
   - Open DevTools (F12)
   - Go to Application tab
   - Clear Storage
   - Refresh page

5. Check if another app is using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # Mac/Linux
   lsof -i :5000
   ```
