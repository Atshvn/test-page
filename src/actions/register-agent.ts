'use server';

import { fetchAPI } from '@/lib/api/fetch-client';
import type { SendRegisterAgentParams } from '@/types';

/**
 * Đăng ký làm đại lý
 */
export async function registerAsAgent(data: SendRegisterAgentParams) {
  return fetchAPI(data, 'WS_spRegisterAgent', { revalidate: false });
}
