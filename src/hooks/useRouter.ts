"use client";

import { useCallback, useEffect } from "react";
import {
  useRouter as useNextRouter,
  usePathname,
} from "next/navigation";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import NProgress from "nprogress";

/**
 * Custom useRouter hook that integrates with NProgress.
 * 
 * Use this instead of Next.js's useRouter for programmatic navigation
 * to ensure the loading bar tracks router.push() and router.replace() calls.
 * 
 * @example
 * ```tsx
 * import { useRouter } from '@/hooks/useRouter';
 * 
 * function MyComponent() {
 *   const router = useRouter();
 *   
 *   const handleClick = () => {
 *     router.push('/some-page'); // Progress bar will show automatically
 *   };
 * }
 * ```
 */
export function useRouter(): AppRouterInstance {
  const router = useNextRouter();
  const pathname = usePathname();

  // Complete progress when pathname changes
  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  const push = useCallback(
    (href: string, options?: any) => {
      // Only start progress if navigating to different route
      if (href !== pathname) {
        NProgress.start();
      }
      router.push(href, options);
    },
    [router, pathname]
  );

  const replace = useCallback(
    (href: string, options?: any) => {
      // Only start progress if navigating to different route
      if (href !== pathname) {
        NProgress.start();
      }
      router.replace(href, options);
    },
    [router, pathname]
  );

  return {
    ...router,
    push,
    replace,
  };
}
