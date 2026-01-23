import "server-only";
import { env } from "@/lib/env";

// ==========================================
// API RESPONSE TYPES
// ==========================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// ==========================================
// INTERNAL FETCH FUNCTION (Server-only)
// ==========================================

/**
 * Base fetch function for main API endpoint
 * This function is SERVER-ONLY and will never be exposed to client
 */
export async function fetchAPI<T = unknown>(
  data: object,
  func: string,
  options?: { revalidate?: number | false },
): Promise<ApiResponse<T>> {
  // Validate required environment variables
  if (!env.API_KEY) {
    console.error(`[API Config Error] ${func}: API_KEY is not configured`);
    return {
      success: false,
      error: "API configuration missing",
    };
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Only add optional headers if they exist
  if (env.X_API_KEY) {
    headers["x-api-key"] = env.X_API_KEY;
  }
  if (env.API_TOKEN) {
    headers["Authorization"] = `Bearer ${env.API_TOKEN}`;
  }

  try {
    const response = await fetch(env.API_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({
        Json: JSON.stringify(data),
        func: func,
        API_key: env.API_KEY,
        ClientId: env.CLIENT_ID,
      }),
      next: { revalidate: options?.revalidate ?? 60 },
    });

    if (!response.ok) {
      // Log more details for debugging
      const errorBody = await response
        .text()
        .catch(() => "Unable to read response body");
      console.error(
        `[API Error] ${func}: ${response.status} ${response.statusText}`,
        process.env.NODE_ENV === "development" ? { errorBody } : "",
      );
      return {
        success: false,
        error: `API Error: ${response.status}`,
      };
    }

    const result = await response.json();
    const parsed = JSON.parse(result);

    return {
      success: true,
      data: parsed as T,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(`[API Error] ${func}:`, errorMessage, data);
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Fetch function for tracking API endpoint
 */
export async function fetchTrackingAPI<T = unknown>(
  data: object,
  options?: { revalidate?: number | false },
): Promise<ApiResponse<T>> {
  if (!env.API_ENDPOINT_TRACKING) {
    return {
      success: false,
      error: "Tracking API endpoint not configured",
    };
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Only add optional headers if they exist
  if (env.X_API_KEY) {
    headers["x-api-key"] = env.X_API_KEY;
  }
  if (env.API_TOKEN) {
    headers["Authorization"] = `Bearer ${env.API_TOKEN}`;
  }

  try {
    const response = await fetch(env.API_ENDPOINT_TRACKING, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...data,
        API_key: env.API_KEY,
        ClientId: env.CLIENT_ID,
      }),
      next: { revalidate: options?.revalidate ?? 60 },
    });

    if (!response.ok) {
      const errorBody = await response
        .text()
        .catch(() => "Unable to read response body");
      console.error(
        `[Tracking API Error]: ${response.status} ${response.statusText}`,
        process.env.NODE_ENV === "development" ? { errorBody } : "",
      );
      return {
        success: false,
        error: `Tracking API Error: ${response.status}`,
      };
    }

    const result = await response.json();

    return {
      success: true,
      data: result as T,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[Tracking API Error]:", errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Upload file to server
 */
export async function fetchUploadAPI(
  formData: FormData,
): Promise<ApiResponse<unknown>> {
  if (!env.API_ENDPOINT_UPLOAD) {
    return {
      success: false,
      error: "Upload API endpoint not configured",
    };
  }

  try {
    formData.append("API_key", env.API_KEY);

    const response = await fetch(
      `${env.API_ENDPOINT_UPLOAD}/API_spCallPostFile`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      console.error(
        `[Upload API Error]: ${response.status} ${response.statusText}`,
      );
      return {
        success: false,
        error: `Upload API Error: ${response.status}`,
      };
    }

    const result = await response.json();

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[Upload API Error]:", errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
}
