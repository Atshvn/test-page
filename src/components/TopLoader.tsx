"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

export interface TopLoaderProps {
  /**
   * Color for the TopLoader.
   * @default "#16a34a"
   */
  color?: string;
  /**
   * The initial position for the TopLoader in percentage, 0.08 is 8%.
   * @default 0.08
   */
  initialPosition?: number;
  /**
   * The increament delay speed in milliseconds.
   * @default 200
   */
  crawlSpeed?: number;
  /**
   * The height for the TopLoader in pixels (px).
   * @default 3
   */
  height?: number;
  /**
   * Auto increamenting behaviour for the TopLoader.
   * @default true
   */
  crawl?: boolean;
  /**
   * To show spinner or not.
   * @default false
   */
  showSpinner?: boolean;
  /**
   * Animation settings using easing (a CSS easing string).
   * @default "ease"
   */
  easing?: string;
  /**
   * Animation speed in ms for the TopLoader.
   * @default 200
   */
  speed?: number;
  /**
   * Defines a shadow for the TopLoader.
   * @default "0 0 10px ${color},0 0 5px ${color}"
   */
  shadow?: string | false;
  /**
   * Defines zIndex for the TopLoader.
   * @default 9999
   */
  zIndex?: number;
}

export function TopLoader({
  color = "#16a34a",
  initialPosition = 0.08,
  crawlSpeed = 200,
  height = 3,
  crawl = true,
  showSpinner = false,
  easing = "ease",
  speed = 200,
  shadow,
  zIndex = 9999,
}: TopLoaderProps = {}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({
      minimum: initialPosition,
      easing,
      speed,
      trickle: crawl,
      trickleSpeed: crawlSpeed,
      showSpinner,
    });

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetBlank = anchor.getAttribute("target");

      if (!href) return;

      // Kiểm tra nếu là external link
      const isExternal = 
        href.startsWith("http://") || 
        href.startsWith("https://") ||
        href.startsWith("//");

      // Kiểm tra nếu là anchor link trong cùng trang
      const isAnchor = href.startsWith("#");

      // Kiểm tra các scheme đặc biệt
      const isSpecialScheme = 
        href.startsWith("tel:") ||
        href.startsWith("mailto:") ||
        href.startsWith("sms:") ||
        href.startsWith("blob:");

      // Kiểm tra nếu mở tab mới
      const opensNewTab = 
        targetBlank === "_blank" ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey;

      // Chỉ start progress cho internal navigation
      if (!isExternal && !isAnchor && !isSpecialScheme && !opensNewTab) {
        NProgress.start();
      }
    };

    const handleHistoryChange = () => {
      NProgress.done();
    };

    // Patch history.pushState và replaceState
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      handleHistoryChange();
      return originalPushState.apply(this, args);
    };

    history.replaceState = function (...args) {
      handleHistoryChange();
      return originalReplaceState.apply(this, args);
    };

    // Event listeners
    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("popstate", handleHistoryChange);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("popstate", handleHistoryChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [
    crawl,
    crawlSpeed,
    easing,
    initialPosition,
    showSpinner,
    speed,
  ]);

  // Complete progress when pathname or search params change
  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  const styles = (
    <style>{`
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: ${color};
        position: fixed;
        z-index: ${zIndex};
        top: 0;
        left: 0;
        width: 100%;
        height: ${height}px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: ${shadow === false ? "none" : shadow || `0 0 10px ${color}, 0 0 5px ${color}`};
        opacity: 1.0;
        transform: rotate(3deg) translate(0px, -4px);
      }
      #nprogress .spinner {
        display: ${showSpinner ? "block" : "none"};
        position: fixed;
        z-index: ${zIndex};
        top: 15px;
        right: 15px;
      }
      #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        border: solid 2px transparent;
        border-top-color: ${color};
        border-left-color: ${color};
        border-radius: 50%;
        animation: nprogress-spinner 400ms linear infinite;
      }
      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }
      .nprogress-custom-parent #nprogress .bar,
      .nprogress-custom-parent #nprogress .spinner {
        position: absolute;
      }
      @keyframes nprogress-spinner {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  );

  return styles;
}
