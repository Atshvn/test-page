// ==========================================
// ADDRESS TYPES
// ==========================================
export interface FetchLocationParams {
  ParentID?: number;
  Type: number;
}

// ==========================================
// APPLICATION TYPES
// ==========================================
export interface FetchInfomationAppParams {
  Type: string;
  Enabled: number;
  Lang: string;
}

// ==========================================
// BLOG TYPES
// ==========================================
export interface FetchNewsParams {
  Slug?: string;
}

export interface FetchPaginationNewsParams {
  keylang: string;
  Url?: string;
  Page?: number;
  PageSize?: number;
}

export interface FetchNewsMostViewParams {
  keylang: string;
}

export interface FetchViewNewsParams {
  NewsId: number;
}

export interface NewsItem {
  NewsId: number;
  NewsTitle: string;
  NewsTitleEn: string;
  NewsDescription: string;
  NewsDescriptionEn: string;
  NewsContent: string;
  NewsContentEn: string;
  ImageNewsShow: string;
  UrlDetail: string;
  MenuName?: string;
  MenuNameEn?: string;
  CreateOn: string;
  IndexNumber?: number;
  MetaTitle?: string;
  MetaKeywords?: string;
  MetaDescription?: string;
  IsFeatured?: boolean;
}

export interface NewsPaginationResponse {
  data: NewsItem[];
  totalCount: number;
  totalPage: number;
}

// ==========================================
// CAREER TYPES
// ==========================================
export interface FetchCareerParams {
  keylang: string;
  Take?: number;
}

export interface SendFormApplyParams {
  HRCandidate_NewID: number;
  CandidateName: string;
  Email: string;
  Phone: string;
  FileCV: unknown;
  HRRecruitmentProposeID: number;
  Creater: number;
}

export interface FetchCareerDetailParams {
  keylang: string;
  Url: string;
}

// ==========================================
// CHAT TYPES
// ==========================================
export interface ApiChatBotListParams {
  ApiBot_Id: number;
}

export interface FetchChatbotQuestionParams {
  KeySearch: string;
  ChatbotId: number;
}

export interface FetchRandomParams {
  KeySearch: string;
  IdRandom: number;
}

export interface FetchLogMessageSaveParams {
  Id_ChatBot_log: number;
  NotifyId: number;
  Id_Recieve: number;
  Name_Recieve: string;
  Id_Send: number;
  Name_Send: string;
  Message: string;
  Createtime: string;
  OfficerId: number;
  Status_Read: number;
  TypeMessage: string;
  Src: number;
  Url: string;
  ProductName: string;
  ProductCode: string;
  ProductPrice: number;
}

export interface FetchLogNotifySaveParams {
  NotifyId: number;
  Name: string;
  Email: string;
  Phone: number;
  Sex: number;
  Status_Read: number;
  Messages: string;
  TimeMessages: string;
  CreateTime: string;
  AutoReply: number;
  TypeNotify: string;
}

export interface FetchGetDatalogParams {
  NotifyId: number;
}

export interface FetchChatTrackingBillParams {
  KeySearch: string;
}

export interface FetchCheckExistParams {
  Phone: string;
}

export interface FetchNotifyListParams {
  KeySearch: string;
  NotifyId: number;
}

export interface FetchTrackingPriceParams {
  CustomerId: number;
  CityGoId: number;
  CityToId: number;
  DistrictTo: number;
  WardToId: number;
  Weight: number;
  Mass: number;
  Number: number;
  HHKG: number;
  COD: number;
}

export interface FetchSendNotifyCSParams {
  FuncSend: string;
  SendFrom: string;
  JsonData: unknown;
}

export interface FetchLoadTeamParams {
  Keys: number;
}

export interface FetchLoadTeamInchargeParams {
  TeamId: number;
}

export interface FetchCheckInchargeParams {
  Phone: string;
}

// ==========================================
// CONTACT TYPES
// ==========================================
export interface SendContactParams {
  ContactId: number;
  ContactName: string;
  Phone: string;
  Email: string;
  Address: string;
  Notes: string;
  Code?: string;
  Type: number;
  LocationId: number;
  StatusId?: number;
  SourceId?: number;
  utm_source?: string;
}

export interface CustomerRatingSaveParams {
  Id: number;
  TotalStar: number;
  Description?: string;
  Satisfaction?: string;
  ReasonForSatisfaction?: string;
  ReferralChannel?: string;
  UrlSource?: string;
  SourceId?: string;
  CustomerName?: string;
  PhoneNumber?: string;
  Types?: number;
  Reason?: unknown;
  Satis?: unknown;
}

// ==========================================
// EVALUATE TYPES
// ==========================================
export interface LadingEvaluationCheckParams {
  Code: string;
}

export interface LadingEvaluationSaveParams {
  Id: number;
  TotalStar: number;
  Description?: string;
  ReferralChannel?: string;
  UrlSource?: string;
  SourceId?: string;
  CustomerName?: string;
  PhoneNumber?: string;
  Types?: number;
  Notes?: string;
  Star?: number;
}

// ==========================================
// LADING TYPES
// ==========================================
export interface FetchTrackingBillParams {
  Code: string;
  FinishMonth: number;
}

export interface LadingRecipientParams {
  IdDeadline: string;
}

// ==========================================
// REGISTER AGENT TYPES
// ==========================================
export interface SendRegisterAgentParams {
  Name: string;
  Phone: string;
  Email: string;
  Address: string;
  IdCard: string;
  DateRange: string;
  IssuedBy: string;
  RegisterAddress: string;
  Length: number;
  Width: number;
  Height: number;
  RoundArea: number;
  StartTime: string;
}

// ==========================================
// SERVICES TYPES
// ==========================================
export interface FetchServiceParams {
  keylang: string;
}

// ==========================================
// SETTING TYPES
// ==========================================
export interface FetchSettingParams {
  KeySelect?: number;
  KeySetting?: unknown;
}

export interface FetchMenuParams {
  keylang: string;
}

export interface FetchBannerParams {
  SlideId: number;
  TypeBannerGroup: number;
}

export interface FetchSectionParams {
  SectionId: number;
  TypeSectionGroup: number;
}

export interface FetchTypicalCustomerParams {
  Id: number;
}

export interface FetchMetaUrlParams {
  GroupId: string;
}

// ==========================================
// TRACKING TYPES
// ==========================================
export interface FetchEstimatesPriceParams {
  CustomerId?: number;
  CityGoId?: number;
  CityToId?: number;
  DistrictTo?: number;
  WardToId?: number;
  Weight?: number;
  Mass?: number;
  Number?: number;
  HHKG?: number;
  COD?: number;
}

// ==========================================
// MENU TYPES
// ==========================================
export interface MenuItem {
  key: string;
  MenuId: number;
  children?: MenuItem[];
  MenuImage: string;
  MenuName: string;
  label: string;
  ParentId?: number;
  IconClass: string;
}

// ==========================================
// POST OFFICE TYPES
// ==========================================
export interface PostOffice {
  PostOfficeID: number;
  POCode: string;
  POName: string;
  LocationId: number;
  POAddress: string;
  POPhone: string;
  Lat: number;
  Lng: number;
  Types: number;
  IsView: boolean;
}
