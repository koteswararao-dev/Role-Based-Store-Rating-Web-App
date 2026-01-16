# Test Credentials for Roxiler Store Rating System

## How to Create Test Users

Since the database starts empty, you need to create users first through the signup page.

### Creating Test Users

1. **Start the backend server:**
```bash
cd backend
npm start
```

2. **Start the frontend:**
```bash
cd frontend
npm start
```

3. **Go to Signup page:** `http://localhost:3000/signup`

---

## Sample Test Credentials

### Admin User
```
Name: Admin User Test Account
Email: admin@test.com
Password: Admin123!
Address: 123 Admin Street, City
Role: admin
```

### Store Owner User
```
Name: Store Owner Test Account
Email: owner@test.com
Password: Owner123!
Address: 456 Owner Avenue, City
Role: owner
```

### Regular User
```
Name: Regular User Test Account
Email: user@test.com
Password: User123!
Address: 789 User Road, City
Role: user
```

---

## Password Requirements

- **Length:** 8-16 characters
- **Uppercase:** At least 1 uppercase letter (A-Z)
- **Special Character:** At least 1 special character (!@#$%^&*)
- **Examples of valid passwords:**
  - `Password123!`
  - `Test@1234`
  - `MyPass#99`

---

## Name Requirements

- **Length:** 20-60 characters
- **Examples:**
  - ✅ `John Doe Smith Anderson` (23 chars)
  - ✅ `Admin User Test Account` (24 chars)
  - ❌ `John Doe` (8 chars - too short)
  - ❌ `John` (4 chars - too short)

---

## Testing Workflow

### 1. Create Admin User
1. Go to signup page
2. Fill in admin credentials above
3. Select role: **admin**
4. Click Sign Up
5. Login with admin credentials

### 2. Create Owner User
1. Logout from admin
2. Go to signup page
3. Fill in owner credentials above
4. Select role: **owner**
5. Click Sign Up
6. Login with owner credentials

### 3. Create Regular User
1. Logout from owner
2. Go to signup page
3. Fill in user credentials above
4. Select role: **user**
5. Click Sign Up
6. Login with user credentials

---

## Testing Features

### As Admin (`admin@test.com`)
- View all stores with average ratings
- View all users
- Delete stores
- Add new users
- Add new stores
- View dashboard statistics

### As Owner (`owner@test.com`)
- Create new stores
- View own stores
- See ratings for own stores
- View list of users who rated

### As User (`user@test.com`)
- Browse all stores
- Rate stores (1-5 stars)
- Update own ratings
- View average ratings

---

## Quick Test Data Creation

### Using Postman/Thunder Client

**1. Create Admin:**
```http
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "Admin User Test Account",
  "email": "admin@test.com",
  "password": "Admin123!",
  "address": "123 Admin Street",
  "role": "admin"
}
```

**2. Create Owner:**
```http
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "Store Owner Test Account",
  "email": "owner@test.com",
  "password": "Owner123!",
  "address": "456 Owner Avenue",
  "role": "owner"
}
```

**3. Create User:**
```http
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "Regular User Test Account",
  "email": "user@test.com",
  "password": "User123!",
  "address": "789 User Road",
  "role": "user"
}
```

---

## Common Issues

### "Name must be between 20 and 60 characters"
- Make sure your name is at least 20 characters long
- Example: `John Doe Smith Anderson` ✅
- Example: `John Doe` ❌

### "Password must contain at least one uppercase letter"
- Include at least one capital letter (A-Z)
- Example: `Password123!` ✅
- Example: `password123!` ❌

### "Password must contain at least one special character"
- Include at least one of: !@#$%^&*
- Example: `Password123!` ✅
- Example: `Password123` ❌

### "Email already registered"
- This email is already in the database
- Try a different email or login with existing credentials

---

## Database Reset

If you want to start fresh:

1. Stop the backend server
2. Delete `backend/database.sqlite`
3. Restart the backend server
4. Database will be recreated empty
5. Create new test users

---

## Interview Demo Credentials

For interview demonstrations, use these professional-looking credentials:

### Admin Demo
```
Name: System Administrator Demo
Email: admin.demo@roxiler.com
Password: RoxAdmin2024!
Role: admin
```

### Owner Demo
```
Name: Business Owner Demo Account
Email: owner.demo@roxiler.com
Password: RoxOwner2024!
Role: owner
```

### User Demo
```
Name: Customer User Demo Account
Email: user.demo@roxiler.com
Password: RoxUser2024!
Role: user
```
