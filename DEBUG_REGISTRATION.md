# 🎯 HOW TO CREATE EVENTS - ROLE ISSUE FIXED

## The Problem

You're logged in as: **ATTENDEE** 👤
But only **ORGANIZERS** can create events! 🚫

## Solution: Register as Organizer

### Step 1: Logout
```
1. Click the logout button in sidebar
   OR
2. Run in console: localStorage.clear(); then refresh
```

### Step 2: Register as Organizer

1. Go to: http://localhost:5173/register
2. Click on **"Organizer"** tab (not Attendee!)
3. Fill in the form:
   - Username
   - Email (use different email from attendee account)
   - Password
   - Phone
   - **Organization Name** (this field only shows for organizers)
4. Click Register

### Step 3: Login with Organizer Account

1. Check your email for verification (if enabled)
2. Go to: http://localhost:5173/login
3. Login with your new organizer credentials
4. You'll be redirected to dashboard

### Step 4: Create Event

Now you can:
- Go to "Create Event" page
- Fill in event details
- Successfully create events! ✅

---

## Quick Check: What Role Am I?

Run this in console:
```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('My role:', user.role);
```

You should see:
- **attendee** = Can't create events ❌
- **organiser** (or organizer) = Can create events ✅
- **vendor** = Can't create events ❌

---

## Backend Role Names

Your backend uses these roles:
- `attendee` - Regular users who attend events
- `organiser` - Event organizers (can create/manage events)
- `vendor` - Service providers

Note: Backend uses British spelling "organiser" not "organizer"

---

## If You Want to Test Both Roles

You can create multiple accounts:

**Account 1 (Attendee):**
- Email: yourname+attendee@gmail.com
- Role: Explore events, register for events

**Account 2 (Organizer):**
- Email: yourname+organizer@gmail.com
- Role: Create and manage events

**Account 3 (Vendor):**
- Email: yourname+vendor@gmail.com
- Role: Offer services for events

Gmail tip: Use `+` to create multiple emails from one address!

---

## Now Fixed

✅ Better error message: "Only Organizers can create events"
✅ Auto-redirect to registration page
✅ Shows which role is required

**Register as Organizer and try again!** 🚀
