'use server';

import { fetchAPI } from '@/lib/api/fetch-client';
import type { LadingEvaluationCheckParams, LadingEvaluationSaveParams } from '@/types';

/**
 * Kiểm tra vận đơn có thể đánh giá không
 */
export async function checkCanEvaluateLading(data: LadingEvaluationCheckParams) {
  return fetchAPI(data, 'CPN_spLading_Evaluation_Check');
}

/**
 * Gửi đánh giá vận đơn
 */
export async function submitLadingEvaluation(data: LadingEvaluationSaveParams) {
  return fetchAPI(data, 'CPN_spLading_Evaluation_Save_V2', { revalidate: false });
}
