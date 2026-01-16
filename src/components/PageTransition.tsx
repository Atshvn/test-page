"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Start loading animation
    setIsLoading(true);

    // End loading after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Top Loading Bar - Progressive Loading */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-gradient-to-r from-green-primary via-green-500 to-green-primary origin-left"
            initial={{ scaleX: 0, opacity: 0.8 }}
            animate={{ 
              scaleX: [0, 0.3, 0.6, 0.95, 1],
              opacity: [0.8, 1, 1, 1, 0]
            }}
            exit={{ scaleX: 1, opacity: 0 }}
            transition={{
              duration: 0.4,
              times: [0, 0.2, 0.5, 0.8, 1],
              ease: [0.4, 0, 0.2, 1]
            }}
            style={{
              transformOrigin: "left",
              boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)"
            }}
          />
        )}
      </AnimatePresence>

      {/* Page Content with Fade */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
