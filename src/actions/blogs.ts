"use server";

import { fetchAPI } from "@/lib/api/fetch-client";
import type {
  FetchNewsParams,
  FetchPaginationNewsParams,
  FetchNewsMostViewParams,
  FetchViewNewsParams,
} from "@/types";

/**
 * Lấy danh sách tin tức/blog
 */
export async function getNews(data: FetchNewsParams) {
  return fetchAPI(data, "CMS_spWeb_News_List");
}

/**
 * Lấy danh sách tin tức phân trang
 */
export async function getNewsPaginated(data: FetchPaginationNewsParams) {
  return fetchAPI(data, "CMS_spWeb_Blog_List_GET");
}

/**
 * Lấy tin tức xem nhiều nhất
 */
export async function getMostViewedNews(data: FetchNewsMostViewParams) {
  return fetchAPI(data, "CMS_spNews_TopView");
}

/**
 * Tăng lượt xem tin tức
 */
export async function incrementNewsView(data: FetchViewNewsParams) {
  return fetchAPI(data, "CMS_spNews_View", { revalidate: false });
}

/**
 * Lấy chi tiết tin tức theo slug
 */
export async function getNewsDetail(data: FetchNewsParams) {
  return fetchAPI(data, "CMS_spWeb_News_Detail");
}
