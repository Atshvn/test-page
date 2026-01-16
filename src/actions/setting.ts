'use server';

import { fetchAPI } from '@/lib/api/fetch-client';
import type {
  FetchSettingParams,
  FetchMenuParams,
  FetchBannerParams,
  FetchSectionParams,
  FetchTypicalCustomerParams,
  FetchMetaUrlParams,
  MenuItem,
} from '@/types';
import type { ApiResponse } from '@/lib/api/fetch-client';

/**
 * Lấy cấu hình hệ thống
 */
export async function getSettings(data: FetchSettingParams) {
  return fetchAPI(data, 'CMS_spSetting_List');
}

/**
 * Lấy menu với cấu trúc nested
 */
export async function getMenu(data: FetchMenuParams): Promise<ApiResponse<MenuItem[]>> {
  const response = await fetchAPI<RawMenuItem[]>(data, 'CMS_spWeb_Menu_List');
  
  if (!response.success || !response.data) {
    return response as unknown as ApiResponse<MenuItem[]>;
  }
  
  return {
    success: true,
    data: buildMenuTree(response.data),
  };
}

/**
 * Lấy danh sách banner/slide
 */
export async function getBanners(data: FetchBannerParams) {
  return fetchAPI(data, 'CMS_spWeb_Slide_List');
}

/**
 * Lấy danh sách sections
 */
export async function getSections(data: FetchSectionParams) {
  return fetchAPI(data, 'CMS_spWeb_Section_List');
}

/**
 * Lấy danh sách khách hàng tiêu biểu
 */
export async function getTypicalCustomers(data: FetchTypicalCustomerParams) {
  return fetchAPI(data, 'CMS_spTypicalCustomer_List');
}

/**
 * Lấy metadata URL cho SEO
 */
export async function getMetaUrl(data: FetchMetaUrlParams) {
  return fetchAPI(data, 'CMS_spMetadataUrl');
}

/**
 * Lấy danh sách bưu cục
 */
export async function getPostOffices() {
  return fetchAPI({}, 'APIC_spPostOffice_GetMany');
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

interface RawMenuItem {
  Id?: number;
  MenuId: number;
  MenuUrl: string;
  MenuImage: string;
  MenuName: string;
  ParentId?: number;
  IconClass: string;
}

interface MenuNode {
  key: string;
  MenuId: number;
  children: MenuNode[];
  MenuImage: string;
  MenuName: string;
  label: string;
  ParentId?: number;
  IconClass: string;
}

function buildMenuTree(items: RawMenuItem[]): MenuItem[] {
  const map = new Map<number, MenuNode>();
  const result: MenuNode[] = [];

  // First pass: create all nodes
  for (const item of items) {
    if (!map.has(item.MenuId)) {
      const key = item.MenuUrl.startsWith('/') 
        ? item.MenuUrl.substring(1) 
        : item.MenuUrl;
        
      map.set(item.MenuId, {
        key,
        MenuId: item.MenuId,
        children: [],
        MenuImage: item.MenuImage,
        MenuName: item.MenuName,
        label: item.MenuName,
        ParentId: item.ParentId,
        IconClass: item.IconClass,
      });
    }
  }

  // Second pass: build tree structure
  for (const item of items) {
    const node = map.get(item.MenuId);
    if (!node) continue;

    if (item.ParentId === undefined || item.ParentId === null) {
      result.push(node);
    } else {
      const parent = map.get(item.ParentId);
      if (parent) {
        parent.children.push(node);
      }
    }
  }

  // Clean up empty children arrays
  return result.map(cleanupEmptyChildren);
}

function cleanupEmptyChildren(node: MenuNode): MenuItem {
  if (node.children.length === 0) {
    const { children, ...rest } = node;
    return rest;
  }
  
  return {
    ...node,
    children: node.children.map(cleanupEmptyChildren),
  };
}
