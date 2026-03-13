/**
 * Deep Linking & Sharing Utility
 * Handles all deep links and shareable URLs across the app
 */

// Base URL for the app (update this for production)
const APP_BASE_URL = typeof window !== 'undefined' 
  ? window.location.origin 
  : 'https://vedictime.app';

export type DeepLinkType = 
  | 'dashboard'
  | 'panchang'
  | 'festival'
  | 'astrology'
  | 'rashi'
  | 'kundali'
  | 'puja'
  | 'shop'
  | 'profile'
  | 'premium'
  | 'compatibility'
  | 'notification';

export interface DeepLinkParams {
  type: DeepLinkType;
  id?: string;
  data?: Record<string, string>;
}

/**
 * Generate a deep link URL
 */
export function generateDeepLink(params: DeepLinkParams): string {
  const { type, id, data } = params;
  
  let path = `/${type}`;
  
  if (id) {
    path += `/${id}`;
  }
  
  const url = new URL(path, APP_BASE_URL);
  
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }
  
  return url.toString();
}

/**
 * Parse a deep link URL
 */
export function parseDeepLink(url: string): DeepLinkParams | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    
    if (pathParts.length === 0) {
      return { type: 'dashboard' };
    }
    
    const type = pathParts[0] as DeepLinkType;
    const id = pathParts[1];
    
    const data: Record<string, string> = {};
    urlObj.searchParams.forEach((value, key) => {
      data[key] = value;
    });
    
    return {
      type,
      id,
      data: Object.keys(data).length > 0 ? data : undefined
    };
  } catch (error) {
    console.error('Failed to parse deep link:', error);
    return null;
  }
}

/**
 * Share content using native share API or fallback
 */
export async function shareContent(params: {
  title: string;
  text: string;
  url: string;
}): Promise<boolean> {
  const { title, text, url } = params;
  
  try {
    // Try native share API first (mobile devices)
    if (navigator.share) {
      await navigator.share({ title, text, url });
      return true;
    }
    
    // Fallback: Try to copy to clipboard
    try {
      await navigator.clipboard.writeText(`${title}\n\n${text}\n\n${url}`);
      return true;
    } catch (clipboardError) {
      // Clipboard API blocked - use fallback method
      return copyToClipboardFallback(`${title}\n\n${text}\n\n${url}`);
    }
  } catch (error) {
    console.error('Share failed:', error);
    // Try fallback copy method
    try {
      return copyToClipboardFallback(`${title}\n\n${text}\n\n${url}`);
    } catch (fallbackError) {
      console.error('Fallback copy failed:', fallbackError);
      return false;
    }
  }
}

/**
 * Fallback method to copy text when Clipboard API is blocked
 */
function copyToClipboardFallback(text: string): boolean {
  try {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.focus();
    textarea.select();
    
    let success = false;
    try {
      success = document.execCommand('copy');
    } catch (err) {
      console.error('execCommand copy failed:', err);
    }
    
    // Clean up
    document.body.removeChild(textarea);
    
    return success;
  } catch (error) {
    console.error('Fallback copy error:', error);
    return false;
  }
}

/**
 * Share Festival
 */
export async function shareFestival(festival: {
  id: string;
  name: string;
  date: string;
  description?: string;
}): Promise<boolean> {
  const url = generateDeepLink({
    type: 'festival',
    id: festival.id
  });
  
  return shareContent({
    title: `🕉️ ${festival.name} - VedicTime`,
    text: `Join me in celebrating ${festival.name} on ${festival.date}!\n\n${festival.description || 'Discover the spiritual significance and rituals.'}`,
    url
  });
}

/**
 * Share Panchang
 */
export async function sharePanchang(panchang: {
  date: string;
  tithi?: string;
  nakshatra?: string;
}): Promise<boolean> {
  const url = generateDeepLink({
    type: 'panchang',
    data: { date: panchang.date }
  });
  
  return shareContent({
    title: `📅 Daily Panchang - VedicTime`,
    text: `Check out today's Panchang for ${panchang.date}\n${panchang.tithi ? `Tithi: ${panchang.tithi}` : ''}\n${panchang.nakshatra ? `Nakshatra: ${panchang.nakshatra}` : ''}`,
    url
  });
}

/**
 * Share Rashi (Zodiac Sign)
 */
export async function shareRashi(rashi: {
  id: string;
  name: string;
  nameHindi: string;
  prediction?: string;
}): Promise<boolean> {
  const url = generateDeepLink({
    type: 'rashi',
    id: rashi.id
  });
  
  return shareContent({
    title: `⭐ ${rashi.name} (${rashi.nameHindi}) Horoscope - VedicTime`,
    text: `Discover ${rashi.name} horoscope predictions!\n\n${rashi.prediction || 'Get daily, weekly, and monthly predictions based on Vedic astrology.'}`,
    url
  });
}

/**
 * Share Horoscope/Astrology
 */
export async function shareHoroscope(horoscope: {
  rashi?: string;
  prediction: string;
  date?: string;
}): Promise<boolean> {
  const url = generateDeepLink({
    type: 'astrology',
    data: horoscope.rashi ? { rashi: horoscope.rashi } : undefined
  });
  
  return shareContent({
    title: `🌟 Daily Horoscope - VedicTime`,
    text: `${horoscope.rashi ? `${horoscope.rashi} - ` : ''}${horoscope.prediction}`,
    url
  });
}

/**
 * Share Puja
 */
export async function sharePuja(puja: {
  id: string;
  name: string;
  description?: string;
}): Promise<boolean> {
  const url = generateDeepLink({
    type: 'puja',
    id: puja.id
  });
  
  return shareContent({
    title: `🙏 ${puja.name} - VedicTime`,
    text: `Learn about ${puja.name} puja rituals and significance.\n\n${puja.description || 'Discover step-by-step guide and benefits.'}`,
    url
  });
}

/**
 * Share Kundali
 */
export async function shareKundali(kundali: {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
}): Promise<boolean> {
  const url = generateDeepLink({
    type: 'kundali',
    data: {
      name: kundali.name,
      date: kundali.birthDate,
      time: kundali.birthTime,
      place: kundali.birthPlace
    }
  });
  
  return shareContent({
    title: `🔮 Kundali - ${kundali.name} - VedicTime`,
    text: `View my Vedic birth chart (Kundali)\nBorn: ${kundali.birthDate} at ${kundali.birthTime}\nPlace: ${kundali.birthPlace}`,
    url
  });
}

/**
 * Share Daily Guidance
 */
export async function shareDailyGuidance(guidance: {
  quote: string;
  author?: string;
  date?: string;
}): Promise<boolean> {
  const url = generateDeepLink({ type: 'dashboard' });
  
  return shareContent({
    title: `✨ Daily Spiritual Guidance - VedicTime`,
    text: `"${guidance.quote}"\n${guidance.author ? `\n- ${guidance.author}` : ''}`,
    url
  });
}

/**
 * Share Muhurat (Auspicious Time)
 */
export async function shareMuhurat(muhurat: {
  name: string;
  time: string;
  date: string;
  significance?: string;
}): Promise<boolean> {
  const url = generateDeepLink({
    type: 'panchang',
    data: { date: muhurat.date }
  });
  
  return shareContent({
    title: `⏰ ${muhurat.name} - VedicTime`,
    text: `Auspicious time for ${muhurat.name}\n📅 ${muhurat.date}\n⏰ ${muhurat.time}\n\n${muhurat.significance || 'Find the best time for your spiritual activities.'}`,
    url
  });
}

/**
 * Share Compatibility Result
 */
export async function shareCompatibility(compatibility: {
  rashi1: string;
  rashi2: string;
  score?: number;
}): Promise<boolean> {
  const url = generateDeepLink({
    type: 'compatibility',
    data: {
      rashi1: compatibility.rashi1,
      rashi2: compatibility.rashi2
    }
  });
  
  return shareContent({
    title: `💑 Zodiac Compatibility - VedicTime`,
    text: `${compatibility.rashi1} & ${compatibility.rashi2} Compatibility\n${compatibility.score ? `Match Score: ${compatibility.score}%` : ''}\n\nDiscover your relationship compatibility based on Vedic astrology!`,
    url
  });
}

/**
 * Share App Invitation
 */
export async function shareAppInvitation(): Promise<boolean> {
  const url = generateDeepLink({ type: 'dashboard' });
  
  return shareContent({
    title: '🕉️ Join VedicTime - Your Daily Spiritual Companion',
    text: `Discover your daily Panchang, Horoscope, Festivals, Kundali, and spiritual guidance.\n\nDownload VedicTime now!`,
    url
  });
}

/**
 * Share Premium Invitation
 */
export async function sharePremiumInvitation(): Promise<boolean> {
  const url = generateDeepLink({
    type: 'premium',
    data: { ref: 'friend_invite' }
  });
  
  return shareContent({
    title: '⭐ VedicTime Premium - Unlock Full Features',
    text: `Get unlimited access to:\n✨ Detailed predictions\n🔮 Advanced Kundali\n🎯 Personalized remedies\n📅 Festival notifications\n\nJoin VedicTime Premium today!`,
    url
  });
}

/**
 * Generate QR Code URL for sharing
 */
export function generateQRCodeURL(deepLink: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(deepLink)}`;
}

/**
 * Get shareable WhatsApp link
 */
export function getWhatsAppShareLink(text: string, url: string): string {
  return `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${url}`)}`;
}

/**
 * Get shareable Facebook link
 */
export function getFacebookShareLink(url: string): string {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

/**
 * Get shareable Twitter link
 */
export function getTwitterShareLink(text: string, url: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
}

/**
 * Get shareable Telegram link
 */
export function getTelegramShareLink(text: string, url: string): string {
  return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
}