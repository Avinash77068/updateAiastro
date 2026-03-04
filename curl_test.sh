#!/bin/bash

# Base URL
BASE_URL="http://localhost:3000/user"

echo "Testing User API Routes"
echo "========================"

# 1. Signup
echo "1. Signup"
curl -X POST "$BASE_URL/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "1234567890"
  }'
# Expected Response:
# {
#   "success": true,
#   "message": "User registered successfully",
#   "data": {
#     "user": {
#       "id": "...",
#       "name": "Test User",
#       "email": "test@example.com",
#       "phone": "1234567890",
#       "isVerified": false,
#       "role": "user"
#     },
#     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
#   }
# }
echo -e "\n\n"

# 2. Login
echo "2. Login"
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }')

echo "$LOGIN_RESPONSE"
# Expected Response:
# {
#   "success": true,
#   "message": "Login successful",
#   "data": {
#     "user": {
#       "id": "...",
#       "name": "Test User",
#       "email": "test@example.com",
#       "phone": "1234567890",
#       "isVerified": false,
#       "role": "user",
#       "lastLogin": "2026-03-04T10:01:30.000Z"
#     },
#     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
#   }
# }

# Extract token from login response
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.data.token')
echo -e "\n\n"

# 3. Send OTP
echo "3. Send OTP"
curl -X POST "$BASE_URL/send-otp" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "1234567890"
  }'
# Expected Response:
# {
#   "success": true,
#   "message": "OTP sent successfully",
#   "data": {
#     "phone": "1234567890",
#     "otpExpiresIn": 600,
#     "otp": "123456"
#   }
# }
echo -e "\n\n"

# 4. Verify OTP (Note: Use the OTP from send-otp response in console)
echo "4. Verify OTP"
curl -X POST "$BASE_URL/verify-otp" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "1234567890",
    "otp": "123456"
  }'
# Expected Response:
# {
#   "success": true,
#   "message": "OTP verified successfully",
#   "data": {
#     "user": {
#       "id": "...",
#       "name": "Test User",
#       "email": "test@example.com",
#       "phone": "1234567890",
#       "isVerified": false,
#       "role": "user",
#       "lastLogin": "2026-03-04T10:01:30.000Z"
#     },
#     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
#   }
# }
echo -e "\n\n"

# 5. Get Profile (Protected)
echo "5. Get Profile"
curl -X GET "$BASE_URL/profile" \
  -H "Authorization: Bearer $TOKEN"
# Expected Response:
# {
#   "success": true,
#   "data": {
#     "user": {
#       "id": "...",
#       "name": "Test User",
#       "email": "test@example.com",
#       "phone": "1234567890",
#       "isVerified": false,
#       "role": "user",
#       "lastLogin": "2026-03-04T10:01:30.000Z",
#       "createdAt": "2026-03-04T09:50:00.000Z"
#     }
#   }
# }
echo -e "\n\n"

# 6. Update Profile (Protected)
echo "6. Update Profile"
curl -X PUT "$BASE_URL/profile" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Updated Test User"
  }'
# Expected Response:
# {
#   "success": true,
#   "message": "Profile updated successfully",
#   "data": {
#     "user": {
#       "id": "...",
#       "name": "Updated Test User",
#       "email": "test@example.com",
#       "phone": "1234567890",
#       "isVerified": false,
#       "role": "user"
#     }
#   }
# }
echo -e "\n\n"

echo "Curl commands completed."
