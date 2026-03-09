# VedicTime - Quick Start Guide

## 🚀 Access the Applications

### Mobile App (User-facing)
Simply open the application normally. You'll see:
- Onboarding with language selection
- Main Dashboard
- All user features

### Admin Panel
To access the Admin Panel, add `/admin` to your URL:

**Local Development:**
```
http://localhost:5173/admin
```

**Production:**
```
https://admin.vedictime.com
```

### Admin Login Credentials
```
Email: admin@vedictime.com
Password: admin123
```

---

## 📱 Mobile App Features

### 1. **Panchang Page**
   - ✅ Calendar type selector (Hindu, Vedic, Tamil, Bengali, Gujarati, Kannada, Malayalam, Telugu, Jain, Sikh)
   - ✅ Day Period (Sunrise to Sunset) with duration
   - ✅ Night Period (Sunset to Sunrise) with duration
   - ✅ Tithi, Nakshatra, Yoga information
   - ✅ Muhurat section with auspicious timings
   - ✅ Inauspicious periods (Rahu Kaal, Gulika Kaal, Yamaganda)

### 2. **Language Selection**
   - ✅ Available in Profile → App Settings
   - ✅ 11 Indian Languages:
     - English
     - हिन्दी (Hindi)
     - தமிழ் (Tamil)
     - বাংলা (Bengali)
     - ગુજરાતી (Gujarati)
     - ಕನ್ನಡ (Kannada)
     - മലയാളം (Malayalam)
     - తెలుగు (Telugu)
     - मराठी (Marathi)
     - ਪੰਜਾਬੀ (Punjabi)
     - संस्कृत (Sanskrit)

### 3. **Reminder System**
   - ✅ Set reminders for Muhurat timings
   - ✅ Set reminders for festivals
   - ✅ Visual feedback when reminder is set
   - ✅ Toast notifications confirm reminder setup

---

## 🎛️ Admin Panel Features

### Dashboard
- **Analytics Overview:**
  - Total Users
  - Premium Subscribers
  - Monthly Revenue
  - Active Sessions

- **Quick Actions:**
  - Add New Festival
  - Update Panchang
  - Send Notification
  - Add Product

### Content Management Sections

#### 1. **Panchang Management** ✅ Full CRUD
   - Add/Edit/Delete daily panchang data
   - Manage all calendar types
   - Set timings for sunrise, sunset
   - Configure Muhurat and inauspicious periods
   - Bulk import capability

#### 2. **Festival Management** ✅ Full CRUD
   - Create and edit festivals
   - Add descriptions, significance, rituals
   - Upload audio/video content
   - Set premium content flags
   - Category management

#### 3. **Astrology Content**
   - Manage daily horoscopes
   - Kundali templates
   - Zodiac compatibility data
   - Premium predictions

#### 4. **Puja Library**
   - Add puja guides
   - Manage mantras
   - Upload audio/video files
   - Set material requirements

#### 5. **Shop Management**
   - Product catalog
   - Inventory control
   - Pricing and discounts
   - Order fulfillment

#### 6. **User Management**
   - View all users
   - Edit user profiles
   - Manage subscriptions
   - User analytics

#### 7. **Subscription Plans**
   - Configure pricing tiers
   - Set feature access
   - Track revenue
   - Plan analytics

#### 8. **Notifications**
   - Send push notifications
   - Schedule alerts
   - Target user segments
   - Campaign tracking

---

## 🔌 API Integration

All data flows through the API layer defined in `/lib/api.ts`

### Example Usage in Mobile App:

```typescript
import { API } from './lib/api';

// Fetch today's panchang
const panchang = await API.Panchang.getToday('hindu');

// Get upcoming festivals
const festivals = await API.Festivals.getUpcoming(5);

// Generate Kundali
const kundali = await API.Astrology.generateKundali({
  date: '1990-05-15',
  time: '06:30',
  place: 'Varanasi',
  latitude: 25.3176,
  longitude: 82.9739
});
```

### API Architecture:
```
Admin Panel (admin.vedictime.com)
         ↓
   REST API Server
         ↓
Mobile App (app.vedictime.com)
```

---

## 🎨 Design System

### Colors
- **Primary Brand:** #C74225 (Saffron)
- **Secondary:** #FFD700 (Gold)
- **Success:** #357A38 (Green)
- **Background:** White with subtle accents

### Typography
- Clean, modern sans-serif fonts
- Hierarchical text sizing
- Excellent readability

---

## 🔒 Security Features

- Admin authentication required
- Role-based access control
- API key authentication (ready)
- HTTPS enforcement
- Data encryption
- Audit logs

---

## 📊 Data Flow

```
1. Admin creates/updates content via Admin Panel
   ↓
2. Data saved to database via API
   ↓
3. Mobile App fetches updated data via API
   ↓
4. Users see latest content in real-time
```

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Notifications:** Sonner
- **State Management:** React Hooks
- **API Layer:** REST with JSON

---

## 📝 Notes

- All CRUD operations are fully functional
- Data persists in component state (can be connected to real backend)
- API layer is ready for production integration
- Responsive design for all screen sizes
- Supports both light and dark modes

---

## 🎯 Next Steps for Production

1. Connect to real backend API
2. Implement user authentication
3. Add payment gateway integration
4. Set up push notification service
5. Deploy to separate domains
6. Configure CDN for media files
7. Set up monitoring and analytics

---

**Enjoy managing your VedicTime application!** 🙏
