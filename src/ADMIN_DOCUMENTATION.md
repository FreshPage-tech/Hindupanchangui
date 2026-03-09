# VedicTime - Admin Panel & API Integration

## Overview

VedicTime has two separate applications:

1. **Mobile App** (`/App.tsx`) - User-facing mobile application
2. **Admin Panel** (`/AdminApp.tsx`) - Backend management dashboard on separate domain

---

## Admin Panel Features

### 🎯 Complete CRUD Operations for:

1. **Panchang Management**
   - Daily panchang data (Tithi, Nakshatra, Yoga)
   - Sunrise/Sunset timings
   - Muhurat timings (Auspicious & Inauspicious periods)
   - Multiple calendar types (Hindu, Vedic, Tamil, Bengali, etc.)

2. **Festival Management**
   - Festival details and descriptions
   - Significance and rituals
   - Mantras and audio content
   - Premium content flagging
   - Category management

3. **Astrology Content**
   - Daily horoscopes for all rashis
   - Kundali templates
   - Zodiac compatibility data
   - Premium predictions

4. **Puja Library**
   - Puja guides and procedures
   - Mantra collections
   - Audio/Video content
   - Material requirements

5. **Shop Management**
   - Product catalog
   - Inventory management
   - Pricing and discounts
   - Order fulfillment
   - Delivery tracking

6. **User Management**
   - User accounts and profiles
   - Birth details and preferences
   - Subscription status
   - Analytics and engagement

7. **Subscription Plans**
   - Plan configuration
   - Pricing tiers
   - Feature access control
   - Revenue analytics

8. **Notifications**
   - Push notification campaigns
   - User targeting
   - Scheduled alerts
   - Notification analytics

---

## Architecture

### Separation of Concerns

```
┌─────────────────────────────────────────┐
│                                         │
│        ADMIN PANEL (Admin Domain)      │
│        admin.vedictime.com              │
│                                         │
│  ┌────────────────────────────────┐    │
│  │  Dashboard & CRUD Interfaces   │    │
│  │  - Panchang Management         │    │
│  │  - Festival Management         │    │
│  │  - Content Management          │    │
│  │  - User Management             │    │
│  └────────────────────────────────┘    │
│                 ↓                       │
│         REST API Server                 │
│    (Node.js, Python, etc.)             │
│                                         │
└─────────────────────────────────────────┘
                 ↓
          API Endpoints
    (JSON over HTTPS)
                 ↓
┌─────────────────────────────────────────┐
│                                         │
│       MOBILE APP (User Domain)         │
│       app.vedictime.com                 │
│                                         │
│  ┌────────────────────────────────┐    │
│  │   React Mobile Application     │    │
│  │   - Dashboard                  │    │
│  │   - Panchang View              │    │
│  │   - Festival Calendar          │    │
│  │   - Astrology Section          │    │
│  │   - Puja Library               │    │
│  │   - Shop                       │    │
│  └────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

---

## API Structure

All API endpoints are defined in `/lib/api.ts`

### Base URL
```
https://admin.vedictime.com/api
```

### Available Endpoints

#### Panchang API
- `GET /api/panchang/today` - Get today's panchang
- `GET /api/panchang/:date` - Get panchang for specific date
- `POST /api/panchang` - Create new panchang entry (Admin)
- `PUT /api/panchang/:id` - Update panchang entry (Admin)
- `DELETE /api/panchang/:id` - Delete panchang entry (Admin)

#### Festivals API
- `GET /api/festivals` - Get all festivals (paginated)
- `GET /api/festivals/:id` - Get festival details
- `GET /api/festivals/upcoming` - Get upcoming festivals
- `POST /api/festivals` - Create festival (Admin)
- `PUT /api/festivals/:id` - Update festival (Admin)
- `DELETE /api/festivals/:id` - Delete festival (Admin)

#### Astrology API
- `GET /api/astrology/horoscope/:rashi` - Get daily horoscope
- `POST /api/astrology/kundali/generate` - Generate Kundali
- `POST /api/astrology/compatibility` - Check compatibility

#### Puja API
- `GET /api/pujas` - Get all pujas
- `GET /api/pujas/:id` - Get puja details
- `POST /api/pujas` - Create puja (Admin)
- `PUT /api/pujas/:id` - Update puja (Admin)
- `DELETE /api/pujas/:id` - Delete puja (Admin)

#### Shop API
- `GET /api/shop/products` - Get products
- `GET /api/shop/products/:id` - Get product details
- `POST /api/shop/orders` - Place order
- `GET /api/shop/orders/:id` - Track order

#### User API
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/preferences` - Get preferences
- `PUT /api/users/preferences` - Update preferences

#### Notifications API
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `POST /api/notifications/send` - Send notification (Admin)

#### Subscription API
- `GET /api/subscriptions/plans` - Get available plans
- `POST /api/subscriptions/purchase` - Purchase subscription
- `GET /api/subscriptions/status` - Get subscription status

---

## How to Use

### Running Admin Panel

To access the admin panel, navigate to:
```
/admin
```

Or in production:
```
https://admin.vedictime.com
```

The admin panel provides:
- Analytics dashboard
- Full CRUD interfaces for all content
- User management
- Real-time statistics
- Content scheduling

### Running Mobile App

The mobile app automatically fetches data from the API endpoints:

```typescript
import { API } from './lib/api';

// Example: Fetch today's panchang
const panchang = await API.Panchang.getToday('hindu');

// Example: Get upcoming festivals
const festivals = await API.Festivals.getUpcoming(5);

// Example: Generate Kundali
const kundali = await API.Astrology.generateKundali({
  date: '1990-05-15',
  time: '06:30',
  place: 'Varanasi',
  latitude: 25.3176,
  longitude: 82.9739
});
```

---

## Features Implemented

### ✅ Panchang Page
- [x] Calendar type selector (Hindu, Vedic, Tamil, Bengali, etc.)
- [x] Day/Night period timings
- [x] Sunrise to Sunset duration
- [x] Sunset to Sunrise duration
- [x] Tithi, Nakshatra, Yoga tabs
- [x] Muhurat section with auspicious timings
- [x] Inauspicious periods under Muhurat

### ✅ Profile/Settings
- [x] Language selection (11 Indian languages)
  - English, Hindi, Tamil, Bengali, Gujarati
  - Kannada, Malayalam, Telugu, Marathi
  - Punjabi, Sanskrit
- [x] Dark mode toggle
- [x] Notification preferences
- [x] Birth details management

### ✅ Admin Panel
- [x] Dashboard with analytics
- [x] Panchang Management (Full CRUD)
- [x] Festival Management (Full CRUD)
- [x] Astrology Content Management
- [x] Puja Library Management
- [x] Shop Management
- [x] User Management
- [x] Subscription Plans Management
- [x] Notification Management

### ✅ API Integration
- [x] Mock API service layer
- [x] All CRUD operations defined
- [x] Pagination support
- [x] Error handling
- [x] Authentication ready

---

## Technical Stack

### Admin Panel
- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Sonner for toast notifications
- Full CRUD interfaces

### Mobile App
- React with TypeScript
- Tailwind CSS v4
- Custom UI components
- API integration layer
- Offline support ready

### API Layer
- RESTful architecture
- JSON data format
- Token-based authentication (ready)
- Rate limiting support
- CORS configuration

---

## Deployment

### Admin Panel Domain
```
admin.vedictime.com
```

### Mobile App Domain
```
app.vedictime.com
```

### API Domain
```
api.vedictime.com
```

---

## Security

- Admin panel requires authentication
- Role-based access control (RBAC)
- API key authentication
- Rate limiting on all endpoints
- HTTPS enforcement
- Data encryption
- Audit logs for all changes

---

## Future Enhancements

- [ ] Real-time data sync
- [ ] WebSocket for live updates
- [ ] Advanced analytics dashboard
- [ ] Multi-admin role support
- [ ] Content versioning
- [ ] Scheduled publishing
- [ ] A/B testing framework
- [ ] Export/Import functionality

---

## Support

For admin panel access or API documentation, contact:
- Email: admin@vedictime.com
- Docs: https://docs.vedictime.com
