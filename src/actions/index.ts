// Address Actions
export {
  getLocations,
  getProvinces,
  getDistricts,
  getWards,
} from './address';

// Application Actions
export { getAppInformation } from './application';

// Blog Actions
export {
  getNews,
  getNewsPaginated,
  getMostViewedNews,
  incrementNewsView,
} from './blogs';

// Career Actions
export {
  getCareers,
  getCareerDetail,
  submitJobApplication,
} from './career';

// Chat Actions
export {
  getChatBotList,
  getChatbotQuestions,
  getRandomMessage,
  saveChatMessage,
  saveChatNotify,
  getChatHistory,
  trackBillViaChatbot,
  checkPhoneExists,
  getNotifyList,
  calculateShippingPrice,
  calculateDeliveryTime,
  sendCustomerServiceNotify,
  getSaleTeam,
  getSaleTeamDetail,
  findSaleByPhone,
} from './chat';

// Contact Actions
export {
  submitContact,
  submitCustomerRating,
} from './contact';

// Evaluate Actions
export {
  checkCanEvaluateLading,
  submitLadingEvaluation,
} from './evaluate';

// Lading Actions
export {
  trackLading,
  trackLadingByDO,
  confirmDeliveryDeadline,
  getDeadlineConfirmations,
} from './lading';

// Register Agent Actions
export { registerAsAgent } from './register-agent';

// Services Actions
export { getServices } from './services';

// Setting Actions
export {
  getSettings,
  getMenu,
  getBanners,
  getSections,
  getTypicalCustomers,
  getMetaUrl,
  getPostOffices,
} from './setting';

// Tracking Actions
export { calculateShippingFee } from './tracking';
