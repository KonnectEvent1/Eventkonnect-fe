# How to See the ACTUAL Error

The console shows "Object" but we need to see WHAT'S INSIDE the object.

## Method 1: Expand the Objects in Console

1. In browser console, you see:
   ```
   Submitting registration: Object
   API Error: Object
   Registration error details: Object
   ```

2. Click the little arrow (▶) next to each "Object" to expand it

3. This will show you the actual data, like:
   ```
   Submitting registration: 
     ▼ Object
       userType: "attendee"
       ▼ data:
         username: "test"
         email: "test@example.com"
         phone: "1234567890"
         password: "[HIDDEN]"
   ```

## Method 2: Check Network Tab

1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Find the request: `signup/attendee`
4. Click on it
5. Go to **Response** tab

**This will show the EXACT error message from backend!**

It might say something like:
- "password must be at least 8 characters"
- "phone must be a valid phone number"
- "email already exists"
- etc.

## What I Need

Please expand those Objects and tell me:

1. What you see in "Submitting registration" object
2. What you see in "API Error" object  
3. What you see in "Registration error details" object

OR

Just tell me what's in the Network tab → Response

That will tell us EXACTLY what to fix!
