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
// CONSTANTS
// ==========================================

const DEFAULT_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Delay helper for retry logic
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Check if error is retryable (network errors, 5xx errors)
 */
const isRetryableError = (error: unknown, status?: number): boolean => {
  if (status && status >= 500) return true;
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes("network") ||
      message.includes("timeout") ||
      message.includes("fetch failed") ||
      message.includes("econnreset")
    );
  }
  return false;
};

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
  options?: { revalidate?: number | false; timeout?: number; retries?: number },
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

  const maxRetries = options?.retries ?? MAX_RETRIES;
  const timeout = options?.timeout ?? DEFAULT_TIMEOUT;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

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
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Retry on 5xx errors
        if (isRetryableError(null, response.status) && attempt < maxRetries) {
          console.warn(
            `[API Retry] ${func}: ${response.status}, attempt ${attempt + 1}/${maxRetries}`,
          );
          await delay(RETRY_DELAY * (attempt + 1));
          continue;
        }

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
      // API trả về JSON string, cần parse lại
      const parsed = typeof result === "string" ? JSON.parse(result) : result;

      return {
        success: true,
        data: parsed as T,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      const isTimeout = error instanceof Error && error.name === "AbortError";
      const errorMessage = isTimeout
        ? "Request timeout"
        : error instanceof Error
          ? error.message
          : "Unknown error";

      // Retry on network errors
      if (isRetryableError(error) && attempt < maxRetries) {
        console.warn(
          `[API Retry] ${func}: ${errorMessage}, attempt ${attempt + 1}/${maxRetries}`,
        );
        await delay(RETRY_DELAY * (attempt + 1));
        continue;
      }

      console.error(`[API Error] ${func}:`, errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  // Should never reach here, but TypeScript needs this
  return {
    success: false,
    error: "Max retries exceeded",
  };
}

/**
 * Fetch function for tracking API endpoint
 */
export async function fetchTrackingAPI<T = unknown>(
  data: object,
  options?: { revalidate?: number | false; timeout?: number; retries?: number },
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

  if (env.X_API_KEY) {
    headers["x-api-key"] = env.X_API_KEY;
  }
  if (env.API_TOKEN) {
    headers["Authorization"] = `Bearer ${env.API_TOKEN}`;
  }

  const maxRetries = options?.retries ?? MAX_RETRIES;
  const timeout = options?.timeout ?? DEFAULT_TIMEOUT;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

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
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (isRetryableError(null, response.status) && attempt < maxRetries) {
          console.warn(
            `[Tracking API Retry]: ${response.status}, attempt ${attempt + 1}/${maxRetries}`,
          );
          await delay(RETRY_DELAY * (attempt + 1));
          continue;
        }

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
      clearTimeout(timeoutId);

      const isTimeout = error instanceof Error && error.name === "AbortError";
      const errorMessage = isTimeout
        ? "Request timeout"
        : error instanceof Error
          ? error.message
          : "Unknown error";

      if (isRetryableError(error) && attempt < maxRetries) {
        console.warn(
          `[Tracking API Retry]: ${errorMessage}, attempt ${attempt + 1}/${maxRetries}`,
        );
        await delay(RETRY_DELAY * (attempt + 1));
        continue;
      }

      console.error("[Tracking API Error]:", errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  return {
    success: false,
    error: "Max retries exceeded",
  };
}

/**
 * Upload file to server
 */
export async function fetchUploadAPI(
  formData: FormData,
  options?: { timeout?: number },
): Promise<ApiResponse<unknown>> {
  if (!env.API_ENDPOINT_UPLOAD) {
    return {
      success: false,
      error: "Upload API endpoint not configured",
    };
  }

  const controller = new AbortController();
  const timeout = options?.timeout ?? 30000; // 30s for uploads
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    formData.append("API_key", env.API_KEY);

    const response = await fetch(
      `${env.API_ENDPOINT_UPLOAD}/API_spCallPostFile`,
      {
        method: "POST",
        body: formData,
        signal: controller.signal,
      },
    );

    clearTimeout(timeoutId);

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
    clearTimeout(timeoutId);

    const isTimeout = error instanceof Error && error.name === "AbortError";
    const errorMessage = isTimeout
      ? "Upload timeout"
      : error instanceof Error
        ? error.message
        : "Unknown error";
    console.error("[Upload API Error]:", errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }
}
