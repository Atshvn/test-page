'use server';

import { fetchAPI } from '@/lib/api/fetch-client';
import type { FetchEstimatesPriceParams } from '@/types';

/**
 * Tính cước phí vận chuyển ước tính
 */
export async function calculateShippingFee(data: FetchEstimatesPriceParams) {
  return fetchAPI(data, 'CPN_spLading_EstimatesPrice');
}
