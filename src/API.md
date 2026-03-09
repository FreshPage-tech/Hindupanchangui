# VedicTime API Documentation

## Base URL

```
Production: https://YOUR_PROJECT.supabase.co/functions/v1/make-server-e18c4393
```

## Authentication

Most endpoints require authentication using JWT tokens.

### Request Headers

```http
Content-Type: application/json
Authorization: Bearer <your-jwt-token>
```

### Getting an Access Token

1. Register a new user or login
2. The response will include an `accessToken`
3. Use this token in the `Authorization` header for subsequent requests

---

## API Endpoints

### Authentication

#### Register User

```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe",
  "language": "en",
  "phone": "+91-1234567890"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "userId": "uuid-here",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Errors:**
- `400`: Missing required fields or invalid data
- `500`: Internal server error

---

#### Login User

```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "refresh-token-here",
    "user": {
      "id": "uuid-here",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

**Errors:**
- `400`: Missing email or password
- `401`: Invalid credentials
- `500`: Internal server error

---

#### Verify Token

```http
GET /auth/verify
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "uuid-here",
    "profile": {
      "email": "user@example.com",
      "name": "John Doe",
      "subscription": {
        "plan": "free"
      }
    }
  }
}
```

**Errors:**
- `401`: Invalid or expired token

---

#### Logout

```http
POST /auth/logout
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

---

### User Management

#### Get User Profile

```http
GET /user/profile
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "uuid-here",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+91-1234567890",
    "language": "en",
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India"
    },
    "preferences": {
      "notifications": true,
      "emailUpdates": false,
      "theme": "light",
      "defaultCalendar": "hindu"
    },
    "subscription": {
      "plan": "free",
      "features": ["limited_kundali", "ads_enabled", "basic_content"]
    },
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-03-09T10:30:00Z"
  }
}
```

---

#### Update User Profile

```http
PUT /user/profile
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "+91-9876543210",
  "location": {
    "city": "Delhi",
    "state": "Delhi",
    "country": "India"
  }
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "userId": "uuid-here",
    "name": "John Updated",
    "updatedAt": "2024-03-09T11:00:00Z"
  }
}
```

---

#### Update Subscription

```http
POST /user/subscription
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "plan": "premium",
  "duration": 30
}
```

**Parameters:**
- `plan`: `"free"` or `"premium"`
- `duration`: Number of days (optional, for premium)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "plan": "premium",
    "startDate": "2024-03-09T10:30:00Z",
    "endDate": "2024-04-08T10:30:00Z",
    "features": [
      "unlimited_kundali",
      "ad_free",
      "premium_content",
      "offline_access",
      "priority_support"
    ]
  }
}
```

---

#### Check Premium Access

```http
GET /user/premium
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "hasPremium": true
  }
}
```

---

#### Update Preferences

```http
PUT /user/preferences
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "notifications": false,
  "theme": "dark",
  "defaultCalendar": "tamil"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "preferences": {
      "notifications": false,
      "emailUpdates": false,
      "theme": "dark",
      "defaultCalendar": "tamil"
    }
  }
}
```

---

#### Delete Account

```http
DELETE /user/account
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true
}
```

**Note:** This permanently deletes the user account and all associated data.

---

### Panchang

#### Get Panchang for Specific Date

```http
GET /panchang/date/:date?calendarType=hindu
```

**Parameters:**
- `date`: Date in YYYY-MM-DD format (e.g., `2024-03-09`)
- `calendarType`: Optional. One of: `hindu`, `vedic`, `tamil`, `bengali`, `gujarati`, `kannada`, `malayalam`, `telugu`, `marathi`, `oriya`, `punjabi`, `jain`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "date": "2024-03-09T00:00:00Z",
    "calendarType": "hindu",
    "tithi": {
      "name": "Pratipada",
      "number": 1,
      "paksha": "Shukla Paksha (Waxing)",
      "startTime": "4:23 AM",
      "endTime": "3:45 AM (next day)"
    },
    "nakshatra": {
      "name": "Rohini",
      "lord": "Moon",
      "element": "Earth",
      "deity": "Brahma",
      "symbol": "Ox Cart"
    },
    "yoga": {
      "name": "Siddhi",
      "type": "auspicious"
    },
    "karana": "Bava",
    "vara": {
      "name": "Saturday",
      "lord": "Saturn"
    },
    "maasa": "Phalguna",
    "ritu": "Shishir (Winter)",
    "vikramSamvat": 2081,
    "sakaSamvat": 1946,
    "timings": {
      "sunrise": "6:24 AM",
      "sunset": "5:47 PM",
      "moonrise": "7:15 PM",
      "moonset": "8:30 AM"
    },
    "inauspicious": {
      "rahuKaal": "9:00 AM - 10:30 AM",
      "gulikaKaal": "4:30 PM - 6:00 PM",
      "yamaganda": "1:30 PM - 3:00 PM",
      "durMuhurtam": ["10:24 AM - 11:12 AM", "3:36 PM - 4:24 PM"]
    },
    "auspicious": {
      "abhijitMuhurat": "11:52 AM - 12:40 PM",
      "brahmaMuhurat": "4:40 AM - 5:28 AM",
      "godhuli": "5:35 PM - 5:59 PM"
    }
  }
}
```

**Rate Limit:** 100 requests per minute

---

#### Get Panchang for Date Range

```http
GET /panchang/range?startDate=2024-03-01&endDate=2024-03-31&calendarType=hindu
```

**Query Parameters:**
- `startDate`: Start date (YYYY-MM-DD)
- `endDate`: End date (YYYY-MM-DD) - max 31 days from start
- `calendarType`: Optional calendar type

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "date": "2024-03-01T00:00:00Z",
      "calendarType": "hindu",
      "tithi": {...},
      ...
    },
    {
      "date": "2024-03-02T00:00:00Z",
      "calendarType": "hindu",
      "tithi": {...},
      ...
    }
  ]
}
```

**Errors:**
- `400`: Missing parameters or date range exceeds 31 days
- `429`: Rate limit exceeded

**Rate Limit:** 50 requests per minute

---

### Kundali

#### Create Kundali

```http
POST /kundali
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Doe",
  "dateOfBirth": "1990-01-15",
  "timeOfBirth": "10:30",
  "placeOfBirth": {
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India",
    "latitude": 19.0760,
    "longitude": 72.8777
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "kundali-id-here",
    "userId": "user-id-here",
    "name": "John Doe",
    "dateOfBirth": "1990-01-15T00:00:00Z",
    "timeOfBirth": "10:30",
    "placeOfBirth": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "country": "India",
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    "sunSign": "Capricorn",
    "moonSign": "Taurus",
    "ascendant": "Pisces",
    "planets": {
      "sun": { "sign": "Capricorn", "house": 1, "degree": 15.5 },
      "moon": { "sign": "Taurus", "house": 4, "degree": 22.3 },
      ...
    },
    "houses": {
      "house1": "Pisces",
      "house2": "Aries",
      ...
    },
    "dashas": {
      "mahasdasha": "Venus",
      "antardasha": "Sun",
      "pratyantardasha": "Moon"
    },
    "predictions": {
      "personality": "You have a dynamic and ambitious personality...",
      "career": "Success in creative fields...",
      "relationships": "Harmonious relationships...",
      "health": "Generally good health...",
      "finance": "Financial stability..."
    },
    "createdAt": "2024-03-09T10:30:00Z"
  }
}
```

**Errors:**
- `400`: Missing required fields or invalid data
- `400`: Free user limit exceeded (3 Kundalis)
- `429`: Rate limit exceeded (10 per minute)

**Rate Limit:** 10 requests per minute

---

#### Get All Kundalis

```http
GET /kundali
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "kundali-1",
      "name": "John Doe",
      "dateOfBirth": "1990-01-15T00:00:00Z",
      "sunSign": "Capricorn",
      "moonSign": "Taurus",
      "createdAt": "2024-03-09T10:30:00Z"
    },
    {
      "id": "kundali-2",
      "name": "Jane Doe",
      ...
    }
  ]
}
```

---

#### Get Specific Kundali

```http
GET /kundali/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "kundali-id-here",
    "name": "John Doe",
    "dateOfBirth": "1990-01-15T00:00:00Z",
    "sunSign": "Capricorn",
    ...
  }
}
```

**Errors:**
- `404`: Kundali not found

---

#### Delete Kundali

```http
DELETE /kundali/:id
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true
}
```

---

### Analytics (Admin Only)

#### Get Global Analytics

```http
GET /analytics/global
```

**Headers:** `Authorization: Bearer <admin-token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalEvents": 15234,
    "totalUsers": 1523,
    "eventsByType": {
      "user_registered": 1523,
      "user_login": 8234,
      "kundali_created": 3421,
      ...
    },
    "eventsPerDay": {
      "2024-03-09": 432,
      "2024-03-08": 521,
      ...
    }
  }
}
```

**Errors:**
- `401`: Not authenticated
- `403`: Not an admin

---

#### Get User Analytics

```http
GET /analytics/user/:userId
```

**Headers:** `Authorization: Bearer <admin-token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalEvents": 45,
    "eventsByType": {
      "panchang_viewed": 23,
      "kundali_created": 3,
      ...
    },
    "lastActive": "2024-03-09T10:30:00Z"
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

### Common HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

---

## Rate Limits

| Endpoint | Limit | Window |
|----------|-------|--------|
| POST /auth/* | 10 req | 1 min |
| GET /panchang/date/* | 100 req | 1 min |
| GET /panchang/range | 50 req | 1 min |
| POST /kundali | 10 req | 1 min |
| Other endpoints | 100 req | 1 min |

When rate limit is exceeded:
```json
{
  "success": false,
  "error": "Rate limit exceeded"
}
```

---

## Client Libraries

### JavaScript/TypeScript

Use the provided API service:

```typescript
import { AuthAPI, PanchangAPI, KundaliAPI } from './utils/api-service';

// Login
const result = await AuthAPI.login({
  email: 'user@example.com',
  password: 'password123'
});

// Get Panchang
const panchang = await PanchangAPI.getForDate('2024-03-09', 'hindu');

// Create Kundali
const kundali = await KundaliAPI.create({
  name: 'John Doe',
  dateOfBirth: '1990-01-15',
  timeOfBirth: '10:30',
  placeOfBirth: {...}
});
```

---

## Webhooks (Future Feature)

Coming soon: Webhooks for subscription events, premium upgrades, etc.

---

## Support

For API issues or questions:
- Check error messages in response
- Review rate limits
- Verify authentication token
- Contact: api-support@vedictime.com

---

**API Version:** 1.0.0  
**Last Updated:** March 9, 2024
