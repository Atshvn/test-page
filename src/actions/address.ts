'use server';

import { fetchAPI } from '@/lib/api/fetch-client';
import type { FetchLocationParams } from '@/types';

/**
 * Lấy dữ liệu địa điểm (tỉnh/thành, quận/huyện, phường/xã)
 * @param data - Type: 1=Tỉnh/Thành, 2=Quận/Huyện, 3=Phường/Xã
 */
export async function getLocations(data: FetchLocationParams) {
  return fetchAPI(data, 'CPN_spLocation_GET');
}

/**
 * Lấy danh sách tỉnh/thành phố
 */
export async function getProvinces() {
  return fetchAPI({ Type: 1 }, 'CPN_spLocation_GET');
}

/**
 * Lấy danh sách quận/huyện theo tỉnh/thành
 */
export async function getDistricts(provinceId: number) {
  return fetchAPI({ ParentID: provinceId, Type: 2 }, 'CPN_spLocation_GET');
}

/**
 * Lấy danh sách phường/xã theo quận/huyện
 */
export async function getWards(districtId: number) {
  return fetchAPI({ ParentID: districtId, Type: 3 }, 'CPN_spLocation_GET');
}
