'use server';

import { fetchAPI } from '@/lib/api/fetch-client';
import type {
  FetchCareerParams,
  SendFormApplyParams,
  FetchCareerDetailParams,
} from '@/types';

/**
 * Lấy danh sách vị trí tuyển dụng
 */
export async function getCareers(data: FetchCareerParams) {
  return fetchAPI(data, 'CMS_spWeb_Career_List_V1');
}

/**
 * Lấy chi tiết vị trí tuyển dụng
 */
export async function getCareerDetail(data: FetchCareerDetailParams) {
  return fetchAPI(data, 'CMS_spWeb_Career_Detail_V1');
}

/**
 * Gửi hồ sơ ứng tuyển
 */
export async function submitJobApplication(data: SendFormApplyParams) {
  return fetchAPI(data, 'HRM_spCandidate_New_Save2', { revalidate: false });
}
