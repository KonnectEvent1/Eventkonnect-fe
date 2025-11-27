# 🚨 Error: 400 Bad Request - SOLUTION

## What You're Seeing
```
POST /api/v1/auth/signup/attendee: 400 (Bad Request)
Error: Bad Request
```

## Is This Frontend or Backend?

**Answer: Most likely BACKEND validation issue**

But we need to confirm. Here's how:

---

## 🔍 Step 1: Check What's Wrong (30 seconds)

### Option A: Quick Test (Recommended)
```bash
cd /home/enock/Eventkonnect-fe
./test-backend.sh
```

This will test your backend directly and show you the EXACT error.

### Option B: Check Browser Console
1. Open your app in browser
2. Press F12 (Developer Tools)
3. Go to **Console** tab
4. Try to register again
5. Look for logs that say:
   ```
   Submitting registration: {...}
   API Error: {...}
   ```
6. The error message will tell you exactly what's wrong

### Option C: Check Backend Terminal
Look at your backend server logs. It should show:
```
ValidationError: password must be at least 8 characters
```
or similar.

---

## 🛠️ Common Fixes

### Fix 1: Password Too Short (Most Common)
**If backend says: "Password must be at least 8 characters"**

Your backend probably requires 8+ characters, but frontend only checks for 6.

**Fix:**
Already updated in the code! If you need stricter validation, let me know.

### Fix 2: Phone Number Format
**If backend says: "Invalid phone format"**

Try these formats:
- `+250781234567` (with country code)
- `250781234567` (without +)

### Fix 3: Email Already Registered
**If backend says: "Email already exists"**

Use a different email address.

### Fix 4: Missing Field
**If backend says: "field X is required"**

The backend needs a field we're not sending. Check your backend schema.

---

## 📝 What I Updated

### 1. Better Error Logging
✅ Frontend now logs exactly what it's sending
✅ Shows detailed error messages
✅ Console shows full error details

### 2. Fixed React Router Warnings
✅ Added future flags to remove warnings
✅ These were just warnings, not errors

### 3. Test Script
✅ Created `test-backend.sh` to test backend directly

---

## 🎯 What To Do Now

### Step 1: Run the test script
```bash
cd /home/enock/Eventkonnect-fe
./test-backend.sh
```

This will show you the EXACT error from backend.

### Step 2: Look at the error message

**If it says password issue:**
- Backend needs 8+ characters
- Or needs special characters
- Or needs uppercase/lowercase/numbers

**If it says phone issue:**
- Backend needs specific format
- Try with country code: `+250...`

**If it says email issue:**
- Email already exists
- Try different email

**If it says missing field:**
- Backend needs additional fields
- We need to add them to registration form

### Step 3: Share the Error

Once you run `./test-backend.sh`, **share the output with me** and I'll give you the exact fix!

---

## 🆘 Quick Actions

### Clear Browser Cache & Retry
```bash
# In browser:
Ctrl + Shift + R (hard refresh)
```

### Check Backend is Running
```bash
curl http://localhost:5000/api/v1/events/all
# Should return events list or 401 unauthorized (both mean backend is running)
```

### Verify .env Configuration
```bash
cat .env
# Should show:
# VITE_API_URL=http://localhost:5000/api/v1
```

---

## 📞 Next Steps

1. **Run** `./test-backend.sh`
2. **Copy** the output
3. **Share** it with me
4. I'll provide the **exact fix**

OR

1. **Open** browser console (F12)
2. **Try** to register
3. **Screenshot** or **copy** the error logs
4. **Share** them with me

---

## 💡 Why This Happened

The frontend and backend need to agree on:
- ✅ Field names (username vs userName)
- ✅ Validation rules (password length, format)
- ✅ Required fields (what's mandatory)
- ✅ Data formats (phone, email, etc.)

We need to make sure they match!

---

**TL;DR**: Run `./test-backend.sh` and share the output. I'll tell you exactly what to fix!
