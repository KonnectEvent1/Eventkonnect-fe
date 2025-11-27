# 🔧 Troubleshooting Guide - 400 Bad Request Error

## 🎯 Your Error
```
POST http://localhost:5000/api/v1/auth/signup/attendee
Status: 400 (Bad Request)
```

## 📊 Step-by-Step Debugging

### Step 1: Check Browser Console
1. Open Developer Tools (F12)
2. Go to **Console** tab
3. You should now see detailed logs like:
   ```
   Submitting registration: {...}
   API Error: {...}
   Registration error details: {...}
   ```
4. **Screenshot or copy these logs** - they show exactly what's wrong

### Step 2: Check Network Tab
1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Click on the failed request (`signup/attendee`)
4. Click **Payload** tab - see what we sent
5. Click **Response** tab - see backend error message

**The Response tab will show the EXACT error from backend!**

### Step 3: Check Backend Logs
Look at your backend terminal. It should show validation errors like:
```
ValidationError: "username" is required
ValidationError: "password" must be at least 8 characters
ValidationError: "phone" must be a valid phone number
```

## 🔍 Common Issues & Solutions

### Issue 1: Field Name Mismatch
**Problem**: Backend expects different field names

**Check your backend**: Does it expect:
- `userName` instead of `username`?
- `phoneNumber` instead of `phone`?
- `emailAddress` instead of `email`?

**Solution**: Update `auth.service.ts` to match backend expectations

### Issue 2: Password Requirements
**Problem**: Backend requires stronger password

**Common requirements:**
- Minimum 8 characters (frontend only checks 6)
- Must include uppercase, lowercase, number
- Must include special characters

**Solution**: Update validation in Register.tsx:
```typescript
if (formData.password.length < 8) {
  toast.error("Password must be at least 8 characters");
  return;
}
```

### Issue 3: Phone Number Format
**Problem**: Backend expects specific phone format

**Examples:**
- ❌ Wrong: `0781234567`
- ✅ Correct: `+250781234567`
- ✅ Correct: `250781234567`

**Solution**: Add phone validation or formatting

### Issue 4: Email Already Exists
**Problem**: Email is already registered

**Solution**: Try a different email or check if user exists

### Issue 5: Missing CORS Headers
**Problem**: Backend not accepting requests from frontend

**Check**: Backend should have:
```python
# Flask
CORS(app, origins=["http://localhost:5173"])

# Or Express
app.use(cors({
  origin: "http://localhost:5173"
}))
```

### Issue 6: Backend Validation Rules
**Problem**: Additional required fields

Your backend might require:
- First name and last name (separate fields)
- Age or date of birth
- Country or location
- Terms acceptance

## 🧪 Test Directly with Backend

### Option 1: Test with cURL
```bash
curl -X POST http://localhost:5000/api/v1/auth/signup/attendee \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser123",
    "email": "test123@example.com",
    "password": "Password123!",
    "phone": "+250123456789"
  }'
```

### Option 2: Test with Postman
1. Create POST request to: `http://localhost:5000/api/v1/auth/signup/attendee`
2. Headers: `Content-Type: application/json`
3. Body (raw JSON):
```json
{
  "username": "testuser123",
  "email": "test123@example.com",
  "password": "Password123!",
  "phone": "+250123456789"
}
```
4. Send and check response

**If Postman works but frontend fails** → Frontend issue
**If Postman also fails** → Backend validation issue

## 📝 Next Steps Based on Response

### If Backend Says "Email already exists"
```typescript
// Frontend already handles this - just try different email
```

### If Backend Says "Invalid phone format"
```typescript
// In Register.tsx, add phone formatting:
const formatPhone = (phone: string) => {
  if (!phone.startsWith('+')) {
    return '+250' + phone; // Add country code
  }
  return phone;
};

// Then in handleSubmit:
phone: formatPhone(formData.phone)
```

### If Backend Says "Password too weak"
```typescript
// Add stronger validation in Register.tsx:
if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
  toast.error("Password must contain uppercase, lowercase, and number");
  return;
}
```

### If Backend Says "Missing required field: X"
```typescript
// Add the missing field to Register.tsx form and formData state
```

## 🎯 Quick Fix Commands

### Update password validation to 8 characters:
```bash
# Will be done below if needed
```

### Add better error logging (already done):
✅ Console logs what we're sending
✅ Console logs detailed error
✅ Shows backend error message in toast

## 🆘 Still Not Working?

### Share These Details:

1. **Console logs** (after registration attempt)
2. **Network Response** (from Network tab)
3. **Backend logs** (from backend terminal)
4. **Backend validation rules** (what does your backend schema/model look like?)

Example backend schema to share:
```python
# Flask-SQLAlchemy model or
# Mongoose schema or
# Prisma schema
```

## ✅ After Fixing

1. Refresh browser (Ctrl+R)
2. Clear form
3. Try registration again
4. Check console for new logs
5. If successful, check email for verification

---

**Most likely issue**: Backend expects 8+ character password or specific phone format.
Check your backend logs for the exact validation error!
