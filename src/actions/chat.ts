'use server';

import { fetchAPI } from '@/lib/api/fetch-client';
import type {
  ApiChatBotListParams,
  FetchChatbotQuestionParams,
  FetchRandomParams,
  FetchLogMessageSaveParams,
  FetchLogNotifySaveParams,
  FetchGetDatalogParams,
  FetchChatTrackingBillParams,
  FetchCheckExistParams,
  FetchNotifyListParams,
  FetchTrackingPriceParams,
  FetchSendNotifyCSParams,
  FetchLoadTeamParams,
  FetchLoadTeamInchargeParams,
  FetchCheckInchargeParams,
} from '@/types';

/**
 * Lấy danh sách chatbot
 */
export async function getChatBotList(data: ApiChatBotListParams) {
  return fetchAPI(data, 'Task_spApi_ChatBot_List');
}

/**
 * Lấy câu hỏi chatbot
 */
export async function getChatbotQuestions(data: FetchChatbotQuestionParams) {
  return fetchAPI(data, 'Task_spChatbotQuestion_List');
}

/**
 * Lấy tin nhắn ngẫu nhiên
 */
export async function getRandomMessage(data: FetchRandomParams) {
  return fetchAPI(data, 'Task_spRandomChatbotMessage_List');
}

/**
 * Lưu tin nhắn chat
 */
export async function saveChatMessage(data: FetchLogMessageSaveParams) {
  return fetchAPI(data, 'CSM_spChatbotLogMessage_Save', { revalidate: false });
}

/**
 * Lưu thông báo chat
 */
export async function saveChatNotify(data: FetchLogNotifySaveParams) {
  return fetchAPI(data, 'CSM_spChatBotLogNotify_Save', { revalidate: false });
}

/**
 * Lấy lịch sử chat
 */
export async function getChatHistory(data: FetchGetDatalogParams) {
  return fetchAPI(data, 'CSM_spChatbotLogMessage_GetDatalog');
}

/**
 * Tra cứu vận đơn qua chatbot
 */
export async function trackBillViaChatbot(data: FetchChatTrackingBillParams) {
  return fetchAPI(data, 'Task_spChatbot_TrackingBill');
}

/**
 * Kiểm tra số điện thoại đã tồn tại
 */
export async function checkPhoneExists(data: FetchCheckExistParams) {
  return fetchAPI(data, 'CSM_spChatBotLogNotify_CheckExist');
}

/**
 * Lấy danh sách thông báo
 */
export async function getNotifyList(data: FetchNotifyListParams) {
  return fetchAPI(data, 'CSM_spChatBotLogNotify_List');
}

/**
 * Tính giá cước vận chuyển
 */
export async function calculateShippingPrice(data: FetchTrackingPriceParams) {
  return fetchAPI(data, 'CPN_spLading_EstimatesPrice');
}

/**
 * Tính thời gian giao hàng dự kiến
 */
export async function calculateDeliveryTime(data: FetchTrackingPriceParams) {
  return fetchAPI(data, 'CPN_spLading_EstimatesPrice');
}

/**
 * Gửi thông báo CSKH
 */
export async function sendCustomerServiceNotify(data: FetchSendNotifyCSParams) {
  return fetchAPI(data, 'APIC_spSendNotification', { revalidate: false });
}

/**
 * Lấy danh sách team sale
 */
export async function getSaleTeam(data: FetchLoadTeamParams) {
  return fetchAPI(data, 'CRM_spTemSale_Get');
}

/**
 * Lấy chi tiết team sale
 */
export async function getSaleTeamDetail(data: FetchLoadTeamInchargeParams) {
  return fetchAPI(data, 'CRM_spTemSaleDetail_Get');
}

/**
 * Tìm nhân viên phụ trách theo SĐT
 */
export async function findSaleByPhone(data: FetchCheckInchargeParams) {
  return fetchAPI(data, 'CRM_spCustomerContact_SaleCare_Phone_Search');
}
