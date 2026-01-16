'use server';

import { fetchAPI } from '@/lib/api/fetch-client';
import type { SendContactParams, CustomerRatingSaveParams } from '@/types';

/**
 * Gửi form liên hệ
 */
export async function submitContact(data: SendContactParams) {
  return fetchAPI(data, 'CRM_spCustomerContact_Save_V1', { revalidate: false });
}

/**
 * Gửi đánh giá khách hàng
 */
export async function submitCustomerRating(data: CustomerRatingSaveParams) {
  return fetchAPI(data, 'CMS_spCustomerRating_Save_V2', { revalidate: false });
}
