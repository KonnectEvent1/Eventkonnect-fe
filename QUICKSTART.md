# 🚀 Quick Start Guide - EventKonnect Frontend

## Prerequisites
- ✅ Node.js installed (v16+)
- ✅ Backend running on `http://localhost:5000`

## 🏃 Get Started in 3 Steps

### Step 1: Setup
```bash
# Navigate to project
cd Eventkonnect-fe

# Install dependencies
npm install --include=dev

# Copy environment file
cp .env.example .env
```

### Step 2: Configure
Open `.env` and verify:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### Step 3: Run
```bash
# Start development server
npm run dev

# Open browser to http://localhost:5173
```

## 🎯 What You Can Do Now

### 1. Register a New Account
- Go to: `http://localhost:5173/register`
- Choose role: Attendee, Organizer, or Vendor
- Fill form and submit
- Check email for verification

### 2. Login
- Go to: `http://localhost:5173/login`
- Enter credentials
- Access dashboard

### 3. Explore Events
- Go to: `http://localhost:5173/explore-events`
- View all available events
- Click "Register Now" to RSVP

### 4. Create Event (Organizers)
- Go to: `http://localhost:5173/create-event`
- Fill event details
- Submit to create

## 📋 Available Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page |
| Login | `/login` | User authentication |
| Register | `/register` | New user signup |
| Explore Events | `/explore-events` | Browse all events |
| Create Event | `/create-event` | Create new event |
| Dashboard | `/dashboard` | Admin dashboard |

## 🔧 Common Commands

```bash
# Development
npm run dev          # Start dev server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format with Prettier
npm run type-check   # Check TypeScript types
```

## 🐛 Troubleshooting

### Backend Connection Failed
```bash
# Check backend is running
curl http://localhost:5000/api/v1/events/all

# If not running, start backend first
```

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or change port in vite.config.ts
```

### Dependencies Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install --include=dev
```

## 📖 Documentation

- 📘 **Full Integration Guide**: `INTEGRATION_GUIDE.md`
- 📗 **Implementation Summary**: `IMPLEMENTATION_SUMMARY.md`
- 📙 **API Reference**: See backend documentation

## 🎨 Design System

### Colors
```css
Primary:    #10b981 (green-500)
Background: #000000 (black)
Cards:      #1f2937 (gray-900)
Border:     #374151 (gray-800)
Text:       #ffffff (white)
```

### Responsive
```
Mobile:  < 640px
Tablet:  640px - 1024px
Desktop: > 1024px
```

## ✅ Quick Test

1. **Start Backend** (Port 5000)
2. **Start Frontend** (Port 5173)
3. **Register** as Attendee
4. **Login** with credentials
5. **Browse** events
6. **Create** event (if organizer)
7. **RSVP** to an event

## 🆘 Need Help?

1. Check browser console (F12)
2. Check terminal for errors
3. Verify `.env` configuration
4. Ensure backend is running
5. Review `INTEGRATION_GUIDE.md`

## 🎉 You're Ready!

The frontend is now fully integrated with the backend. All authentication, event management, and user operations are connected and working.

Happy coding! 🚀
