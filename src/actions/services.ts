'use server';

import { fetchAPI } from '@/lib/api/fetch-client';
import type { FetchServiceParams } from '@/types';

/**
 * Lấy danh sách dịch vụ
 */
export async function getServices(data: FetchServiceParams) {
  return fetchAPI(data, 'CMS_spWeb_Service_List');
}
