#!/bin/bash

echo "🧪 Testing Backend Registration Endpoint..."
echo ""
echo "Testing Attendee Registration:"
echo "=============================="

response=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST http://localhost:5000/api/v1/auth/signup/attendee \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser123",
    "email": "test123@example.com",
    "password": "Password123!",
    "phone": "+250123456789"
  }')

http_code=$(echo "$response" | grep "HTTP_CODE" | cut -d':' -f2)
body=$(echo "$response" | sed '/HTTP_CODE/d')

echo ""
echo "HTTP Status: $http_code"
echo "Response Body:"
echo "$body" | jq '.' 2>/dev/null || echo "$body"
echo ""

if [ "$http_code" = "201" ] || [ "$http_code" = "200" ]; then
  echo "✅ SUCCESS! Backend is working correctly."
  echo ""
  echo "Frontend issue possible causes:"
  echo "1. CORS issue"
  echo "2. Data format mismatch"
  echo "3. Check browser console for details"
elif [ "$http_code" = "400" ]; then
  echo "❌ 400 Bad Request - Backend Validation Error"
  echo ""
  echo "The error message above shows what's wrong."
  echo "Common fixes:"
  echo "1. Password too short (needs 8+ chars)"
  echo "2. Invalid phone format"
  echo "3. Missing required fields"
  echo "4. Email already exists"
else
  echo "❌ ERROR: Unexpected status code"
  echo "Is your backend running on http://localhost:5000?"
fi

echo ""
echo "================================"
echo "To test with different data, edit this file: test-backend.sh"
