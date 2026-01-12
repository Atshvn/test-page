'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SCROLL_POSITION_KEY = 'scrollPosition';

export function useScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Khôi phục vị trí scroll khi component mount
    const savedPosition = sessionStorage.getItem(`${SCROLL_POSITION_KEY}_${pathname}`);
    
    if (savedPosition) {
      const position = parseInt(savedPosition, 10);
      // Delay một chút để đảm bảo content đã load xong
      setTimeout(() => {
        window.scrollTo(0, position);
      }, 0);
    }

    // Lưu vị trí scroll trước khi reload hoặc thoát trang
    const saveScrollPosition = () => {
      sessionStorage.setItem(
        `${SCROLL_POSITION_KEY}_${pathname}`,
        window.scrollY.toString()
      );
    };

    // Lưu vị trí khi scroll
    const handleScroll = () => {
      sessionStorage.setItem(
        `${SCROLL_POSITION_KEY}_${pathname}`,
        window.scrollY.toString()
      );
    };

    // Lưu vị trí trước khi thoát trang
    window.addEventListener('beforeunload', saveScrollPosition);
    // Cập nhật vị trí khi scroll (throttle để tối ưu performance)
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };
    
    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [pathname]);
}
