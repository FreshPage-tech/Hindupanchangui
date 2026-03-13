# 🌟 VedicTime Astrology & Rashi API Documentation

## Overview

The Astrology/Rashi API provides comprehensive information about all 12 Zodiac Signs (Rashi) with detailed predictions, characteristics, compatibility, and guidance.

---

## Features

✅ **12 Complete Zodiac Signs** with Hindi names  
✅ **Daily, Weekly, Monthly Predictions**  
✅ **Career, Love, Health, Finance Guidance**  
✅ **Compatibility Calculator**  
✅ **Lucky Numbers, Colors, Gemstones**  
✅ **Positive & Negative Characteristics**  
✅ **Element, Quality, Ruling Planet**  
✅ **Best Match Recommendations**  

---

## API Endpoints

### 1. Get All Rashi (Zodiac Signs)

```http
GET /astrology/rashi
```

**Authentication:** Not required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "aries",
      "name": "Aries",
      "nameHindi": "मेष (Mesh)",
      "element": "Fire",
      "quality": "Cardinal",
      "rulingPlanet": "Mars",
      "symbol": "♈",
      "dates": "March 21 - April 19",
      "luckyNumbers": [1, 9, 19, 28, 37, 46, 55],
      "luckyColors": ["Red", "Scarlet", "Crimson"],
      "luckyGemstone": "Ruby, Coral",
      "compatibility": {
        "best": ["Leo", "Sagittarius", "Gemini", "Aquarius"],
        "good": ["Aries", "Libra"],
        "challenging": ["Cancer", "Capricorn"]
      },
      "characteristics": {
        "positive": ["Courageous", "Energetic", "Confident", "Enthusiastic", "Dynamic", "Quick-witted"],
        "negative": ["Impatient", "Aggressive", "Impulsive", "Short-tempered", "Selfish"]
      },
      "todayPrediction": "Today brings new opportunities...",
      "weeklyPrediction": "This week favors career advancement...",
      "monthlyPrediction": "A transformative month ahead...",
      "careerGuidance": "Your leadership qualities make you excellent...",
      "loveGuidance": "Be patient with your partner...",
      "healthGuidance": "Focus on head, face, and brain health...",
      "financeGuidance": "Good financial prospects this period...",
      "luckyDay": "Tuesday",
      "luckyTime": "6:00 AM - 7:30 AM"
    },
    // ... 11 more Rashi
  ]
}
```

---

### 2. Get Specific Rashi by ID

```http
GET /astrology/rashi/:id
```

**Parameters:**
- `id` (string): Rashi ID - one of: `aries`, `taurus`, `gemini`, `cancer`, `leo`, `virgo`, `libra`, `scorpio`, `sagittarius`, `capricorn`, `aquarius`, `pisces`

**Authentication:** Optional (tracks analytics if authenticated)

**Example:**
```bash
GET /astrology/rashi/leo
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "leo",
    "name": "Leo",
    "nameHindi": "सिंह (Simha)",
    "element": "Fire",
    "quality": "Fixed",
    "rulingPlanet": "Sun",
    "symbol": "♌",
    "dates": "July 23 - August 22",
    "luckyNumbers": [1, 4, 10, 13, 19, 22, 31],
    "luckyColors": ["Gold", "Orange", "Yellow"],
    "luckyGemstone": "Ruby, Peridot",
    "compatibility": {
      "best": ["Aries", "Sagittarius", "Gemini", "Libra"],
      "good": ["Leo", "Aquarius"],
      "challenging": ["Taurus", "Scorpio"]
    },
    "characteristics": {
      "positive": ["Generous", "Warm-hearted", "Creative", "Enthusiastic", "Faithful", "Loving"],
      "negative": ["Arrogant", "Stubborn", "Self-centered", "Inflexible", "Lazy"]
    },
    "todayPrediction": "Your natural charisma attracts positive attention. Creative projects flourish. Leadership opportunities arise.",
    "weeklyPrediction": "Recognition for your efforts comes this week. Social life active. Romance blooms. Enjoy the spotlight.",
    "monthlyPrediction": "Career advancement and public recognition. Creative pursuits successful. Love life passionate and exciting.",
    "careerGuidance": "Natural leaders in entertainment, politics, management, and creative fields. Your confidence inspires others.",
    "loveGuidance": "Your generous heart attracts admirers. Show vulnerability to deepen bonds. Grand romantic gestures appreciated.",
    "healthGuidance": "Focus on heart, spine, and upper back. Regular exercise maintains vitality. Avoid stress on cardiovascular system.",
    "financeGuidance": "Generous nature needs balance with savings. Luxury investments may appeal. Business ventures show promise.",
    "luckyDay": "Sunday",
    "luckyTime": "5:00 AM - 6:30 AM"
  }
}
```

---

### 3. Get Rashi by Birth Date

```http
GET /astrology/rashi-by-date/:date
```

**Parameters:**
- `date` (string): Birth date in YYYY-MM-DD format

**Authentication:** Not required

**Example:**
```bash
GET /astrology/rashi-by-date/1990-08-15
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "leo",
    "name": "Leo",
    "nameHindi": "सिंह (Simha)",
    // ... full Rashi data
  }
}
```

---

### 4. Get Rashi Compatibility

```http
GET /astrology/compatibility?rashi1=leo&rashi2=aries
```

**Query Parameters:**
- `rashi1` (string): First Rashi ID
- `rashi2` (string): Second Rashi ID

**Authentication:** Not required

**Example:**
```bash
GET /astrology/compatibility?rashi1=leo&rashi2=aries
```

**Response:**
```json
{
  "success": true,
  "data": {
    "rashi1": "Leo",
    "rashi2": "Aries",
    "compatibilityLevel": "Excellent",
    "compatibilityScore": 90,
    "description": "Leo and Aries make an excellent match! Your energies complement each other beautifully.",
    "element1": "Fire",
    "element2": "Fire",
    "rulingPlanet1": "Sun",
    "rulingPlanet2": "Mars"
  }
}
```

**Compatibility Levels:**
- `Excellent` (90%): Best matches
- `Good` (70%): Compatible with effort
- `Moderate` (50%): Requires balance
- `Challenging` (40%): Needs extra work

---

## Frontend Usage Examples

### Get All Zodiac Signs

```typescript
import { AstrologyAPI } from './utils/api-service-firebase';

async function loadAllRashi() {
  const result = await AstrologyAPI.getAllRashi();
  
  if (result.success) {
    console.log('All Zodiac Signs:', result.data);
    // Display in a grid or list
  }
}
```

### Get Specific Rashi

```typescript
async function loadRashiDetails(rashiId: string) {
  const result = await AstrologyAPI.getRashiById(rashiId);
  
  if (result.success) {
    const rashi = result.data;
    console.log(`${rashi.name} (${rashi.nameHindi})`);
    console.log('Element:', rashi.element);
    console.log('Today\'s Prediction:', rashi.todayPrediction);
    console.log('Lucky Colors:', rashi.luckyColors.join(', '));
  }
}

// Example: Load Leo details
loadRashiDetails('leo');
```

### Find Rashi by Birth Date

```typescript
async function findMyRashi(birthDate: string) {
  const result = await AstrologyAPI.getRashiByDate(birthDate);
  
  if (result.success) {
    const rashi = result.data;
    console.log('Your Rashi:', rashi.name);
    console.log('Lucky Day:', rashi.luckyDay);
    console.log('Lucky Time:', rashi.luckyTime);
    console.log('Best Matches:', rashi.compatibility.best.join(', '));
  }
}

// Example: Find Rashi for someone born on August 15, 1990
findMyRashi('1990-08-15');
```

### Check Compatibility

```typescript
async function checkCompatibility(myRashi: string, partnerRashi: string) {
  const result = await AstrologyAPI.getCompatibility(myRashi, partnerRashi);
  
  if (result.success) {
    const compat = result.data;
    console.log(`${compat.rashi1} & ${compat.rashi2}`);
    console.log('Compatibility:', compat.compatibilityLevel);
    console.log('Score:', compat.compatibilityScore + '%');
    console.log('Description:', compat.description);
  }
}

// Example: Check Leo & Aries compatibility
checkCompatibility('leo', 'aries');
```

---

## All 12 Zodiac Signs (Rashi)

| ID | Name | Hindi Name | Dates | Element |
|----|------|------------|-------|---------|
| `aries` | Aries | मेष (Mesh) | Mar 21 - Apr 19 | Fire |
| `taurus` | Taurus | वृषभ (Vrishabha) | Apr 20 - May 20 | Earth |
| `gemini` | Gemini | मिथुन (Mithun) | May 21 - Jun 20 | Air |
| `cancer` | Cancer | कर्क (Karka) | Jun 21 - Jul 22 | Water |
| `leo` | Leo | सिंह (Simha) | Jul 23 - Aug 22 | Fire |
| `virgo` | Virgo | कन्या (Kanya) | Aug 23 - Sep 22 | Earth |
| `libra` | Libra | तुला (Tula) | Sep 23 - Oct 22 | Air |
| `scorpio` | Scorpio | वृश्चिक (Vrishchika) | Oct 23 - Nov 21 | Water |
| `sagittarius` | Sagittarius | धनु (Dhanu) | Nov 22 - Dec 21 | Fire |
| `capricorn` | Capricorn | मकर (Makara) | Dec 22 - Jan 19 | Earth |
| `aquarius` | Aquarius | कुंभ (Kumbha) | Jan 20 - Feb 18 | Air |
| `pisces` | Pisces | मीन (Meena) | Feb 19 - Mar 20 | Water |

---

## Data Included for Each Rashi

### Basic Information
- English & Hindi names
- Symbol (Unicode)
- Date range
- Element (Fire/Earth/Air/Water)
- Quality (Cardinal/Fixed/Mutable)
- Ruling Planet

### Predictions
- Today's Prediction
- Weekly Prediction
- Monthly Prediction

### Guidance
- Career Guidance
- Love & Relationship Guidance
- Health Guidance
- Finance Guidance

### Lucky Elements
- Lucky Numbers (7 numbers)
- Lucky Colors (multiple)
- Lucky Gemstones
- Lucky Day
- Lucky Time

### Personality
- Positive Characteristics (6+ traits)
- Negative Characteristics (4+ traits)

### Compatibility
- Best Matches (4 signs)
- Good Matches (2 signs)
- Challenging Matches (2 signs)

---

## Use Cases

### 1. Astrology Section in App
Display all 12 zodiac signs in a grid with symbols and names. Users can tap to view detailed information.

### 2. Personal Horoscope
Show user their zodiac sign based on birth date with daily predictions and guidance.

### 3. Compatibility Checker
Allow users to check compatibility with partners, friends, or colleagues.

### 4. Daily Horoscope Widget
Display today's prediction for user's zodiac sign on dashboard.

### 5. Zodiac Calendar View
Show all zodiac signs with their date ranges for easy reference.

---

## Error Responses

**Rashi Not Found:**
```json
{
  "success": false,
  "error": "Rashi not found"
}
```

**Invalid Date Format:**
```json
{
  "success": false,
  "error": "Invalid date format"
}
```

**Missing Parameters:**
```json
{
  "success": false,
  "error": "Missing rashi parameters"
}
```

---

## Performance Notes

- All Rashi data is stored in-memory (server-side)
- No database queries needed
- Instant response times
- No rate limiting on these endpoints
- Safe to call frequently

---

## Example UI Components

### Rashi Card Component
```typescript
function RashiCard({ rashi }: { rashi: RashiData }) {
  return (
    <div className="rashi-card">
      <div className="rashi-symbol">{rashi.symbol}</div>
      <h3>{rashi.name}</h3>
      <p className="hindi-name">{rashi.nameHindi}</p>
      <p className="dates">{rashi.dates}</p>
      <div className="element">{rashi.element}</div>
      <button onClick={() => viewDetails(rashi.id)}>
        View Details
      </button>
    </div>
  );
}
```

### Compatibility Widget
```typescript
function CompatibilityWidget() {
  const [rashi1, setRashi1] = useState('');
  const [rashi2, setRashi2] = useState('');
  const [result, setResult] = useState(null);

  const checkCompatibility = async () => {
    const response = await AstrologyAPI.getCompatibility(rashi1, rashi2);
    if (response.success) {
      setResult(response.data);
    }
  };

  return (
    <div className="compatibility-widget">
      <select onChange={(e) => setRashi1(e.target.value)}>
        {/* Rashi options */}
      </select>
      <span className="heart">❤️</span>
      <select onChange={(e) => setRashi2(e.target.value)}>
        {/* Rashi options */}
      </select>
      <button onClick={checkCompatibility}>Check Compatibility</button>
      
      {result && (
        <div className="result">
          <h4>{result.compatibilityLevel}</h4>
          <div className="score">{result.compatibilityScore}%</div>
          <p>{result.description}</p>
        </div>
      )}
    </div>
  );
}
```

---

## 🎯 Next Steps

1. **Integrate into Astrology Section**: Add Rashi grid view
2. **Personal Horoscope**: Show user's zodiac based on profile
3. **Compatibility Feature**: Add relationship compatibility checker
4. **Daily Notifications**: Send daily horoscope notifications
5. **Share Feature**: Allow users to share their Rashi info

---

**All Rashi data is calculated and served from the backend. No business logic in frontend!** 🌟
