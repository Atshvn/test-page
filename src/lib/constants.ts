// ==========================================
// API CONSTANTS
// ==========================================
export const API_WS = "https://admin-netco.vps.vn/api/apiws/";
export const API_ERP = "https://api-v4-erp.vps.vn/api";
export const API_CHAT = "https://erp-chat.vps.vn/api/ApiMB";

// ==========================================
// EXTERNAL SERVICE KEYS
// ==========================================
export const GOOGLE_MAP_API_KEY = "AIzaSyBuzp_wR2Iawrq2Nc4RAapnH9YtyunC2KA";
export const GOOGLE_MAP_ZOOM = 5;
export const GOOGLE_MAP_CENTER = [14.775869, 106.688661] as const;
export const GOOGLE_MAP_LOCATION = { lat: 14.775869, lng: 106.688661 };

export const GOOGLE_LOGIN_CLIENTID =
  "418580183625-h3psg5ke3ri923qg5kuos64jmr0j2fuj.apps.googleusercontent.com";
export const FACEBOOK_LOGIN_APPID = "836612320191788";

// ==========================================
// APPLICATION URLS
// ==========================================
export const FILE_URL = "https://admin-netco.vps.vn/";
export const CUSTOMER_CREATE_LADING_URL =
  "https://customer.netco.com.vn/tao-nhanh-van-don";

// ==========================================
// CHAT CONFIGURATION
// ==========================================
export const CHAT_USERS = [
  { Type: "CustomerCare", Area: "North", UserId: 3821 },
  { Type: "CustomerCare", Area: "Middle", UserId: 5175 },
  { Type: "CustomerCare", Area: "South", UserId: 5176 },
  { Type: "ShippingConsulting", Area: "North", UserId: 5138 },
  { Type: "ShippingConsulting", Area: "Middle", UserId: 5138 },
  { Type: "ShippingConsulting", Area: "South", UserId: 5138 },
] as const;

export const CHAT_USERS_LIST = [
  { Type: "CustomerCare", Area: "North", UserId: 666 },
  { Type: "CustomerCare", Area: "Middle", UserId: 666 },
  { Type: "CustomerCare", Area: "South", UserId: 666 },
  { Type: "ShippingConsulting", Area: "North", UserId: 666 },
  { Type: "ShippingConsulting", Area: "Middle", UserId: 666 },
  { Type: "ShippingConsulting", Area: "South", UserId: 666 },
  { Type: "CustomerCare", Area: "North", UserId: 2048 },
  { Type: "CustomerCare", Area: "North", UserId: 3801 },
  { Type: "CustomerCare", Area: "Middle", UserId: 627 },
  { Type: "CustomerCare", Area: "South", UserId: 1070 },
  { Type: "ShippingConsulting", Area: "North", UserId: 3739 },
  { Type: "ShippingConsulting", Area: "Middle", UserId: 3739 },
  { Type: "ShippingConsulting", Area: "South", UserId: 3739 },
  { Type: "ShippingConsulting", Area: "North", UserId: 5010 },
  { Type: "ShippingConsulting", Area: "Middle", UserId: 5010 },
  { Type: "ShippingConsulting", Area: "South", UserId: 5010 },
] as const;

export const CHAT_LIST_USER = [3821, 5138, 5175, 5177, 5176, 5178] as const;

export const CHAT_GROUPS = [
  { Type: "CustomerCare", Area: "North", UserId: "g6339" },
  { Type: "CustomerCare", Area: "Middle", UserId: "g6340" },
  { Type: "CustomerCare", Area: "South", UserId: "g6341" },
] as const;

// ==========================================
// COMPANY INFORMATION
// ==========================================
export const COMPANY_INFO = {
  name: "NETCO POST",
  nameShort: "NETCO",

  // Contact
  hotline: "1900 6463",
  hotlineTel: "19006463", // For tel: links
  email: "info@netco.com.vn",
  emailSupport: "support@netco.com.vn",

  // Head Office Address
  address: {
    vi: {
      street: "Lầu 3, Tòa nhà TLE, 36A Đường Trường Sơn, Phường Tân Sơn Hòa",
      city: "Thành phố Hồ Chí Minh",
      country: "Việt Nam",
      postalCode: "700000",
    },
    en: {
      street: "Floor 3, TLE Building, 36A Truong Son Street, Tan Son Hoa Ward",
      city: "Ho Chi Minh City",
      country: "Vietnam",
      postalCode: "700000",
    },
  },

  // Coordinates (Head Office)
  coordinates: {
    lat: 10.7769,
    lng: 106.7009,
  },

  // Working Hours
  workingHours: {
    vi: {
      weekdays: "Thứ 2 - Thứ 6: 08:00 - 17:30",
      saturday: "Thứ 7: 08:00 - 12:00",
      sunday: "Chủ nhật: Nghỉ",
    },
    en: {
      weekdays: "Monday - Friday: 08:00 - 17:30",
      saturday: "Saturday: 08:00 - 12:00",
      sunday: "Sunday: Closed",
    },
  },

  // Social Media
  social: {
    facebook: "https://www.facebook.com/netcopost",
    tiktok: "https://tiktok.com/@netcopost",
    youtube: "https://youtube.com/netcopost",
    linkedin: "https://www.linkedin.com/company/netco-post",
    messenger: "https://m.me/netcopost",
    zalo: "https://zalo.me/4595161656116022900",
  },

  // App Download
  app: {
    android: "https://internal-app.netco.com.vn",
    ios: "https://apps.apple.com/us/app/netco-post/id1447203920",
  },

  // Website
  website: "https://netco.com.vn",
  customerPortal: "https://customer.netco.com.vn",
} as const;
