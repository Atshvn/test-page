'use server';

import { fetchAPI, fetchTrackingAPI } from '@/lib/api/fetch-client';
import type { FetchTrackingBillParams, LadingRecipientParams } from '@/types';

/**
 * Tra cứu vận đơn theo mã
 */
export async function trackLading(data: FetchTrackingBillParams) {
  return fetchTrackingAPI(data);
}

/**
 * Tra cứu vận đơn theo DO Code
 */
export async function trackLadingByDO(data: FetchTrackingBillParams) {
  return fetchAPI(data, 'APIC_spLading_FindDOCode');
}

/**
 * Xác nhận thời hạn giao hàng
 */
export async function confirmDeliveryDeadline(data: LadingRecipientParams) {
  return fetchAPI(data, 'CPN_spRecipient_Confirm_Deadline_ByCustomer', { revalidate: false });
}

/**
 * Lấy danh sách xác nhận deadline theo ID
 */
export async function getDeadlineConfirmations(data: LadingRecipientParams) {
  return fetchAPI(data, 'CPN_spLading_Recipient_Confirm_Deadline_ListById');
}
