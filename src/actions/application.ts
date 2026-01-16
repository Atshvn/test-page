'use server';

import { fetchAPI } from '@/lib/api/fetch-client';
import type { FetchInfomationAppParams } from '@/types';

/**
 * Lấy thông tin ứng dụng
 */
export async function getAppInformation(data: FetchInfomationAppParams) {
  return fetchAPI(data, 'WS_spGetInformation');
}
