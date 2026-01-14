"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function TruckLineAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-based animation for the truck
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to path progress (0 to 1)
  const pathProgress = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  // Smooth spring animation
  const smoothProgress = useSpring(pathProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  // Calculate truck position - only on line 3 (bottom horizontal line)
  // Line 3 starts at curve point (~68% from right after flip) and goes full left
  // Xe xuất phát từ điểm bắt đầu line 3 (sau điểm cong) và chạy sang trái
  const truckLeftPercent = useTransform(smoothProgress, [0, 1], [62, 5]);

  return (
    <div
      ref={containerRef}
      className="relative w-full hidden lg:block pointer-events-none overflow-hidden"
      style={{
        height: "400px", // Tăng height để chứa xe
        marginTop: "-190px", // Đè lên phần trắng của RequestQuote
        zIndex: 30,
      }}
    >
      {/* SVG Decoration Line - Flipped horizontally (scaleX: -1) */}
      <div
        className="absolute inset-0 overflow-visible"
        style={{
          transform: "scaleX(-1)", // Flip SVG để đi từ phải qua trái
        }}
      >
        <svg
          width="1324"
          height="343"
          viewBox="0 0 1324 343"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-0"
          style={{
            maxWidth: "100%",
          }}
        >
          {/* Background path - light gray */}
          {/* Line 3 (bottom) now extends full width to the left (to x=0) */}
          <path
            d="M2 0V189.5C2 200.546 10.9543 209.5 22 209.5H384.516C395.561 209.5 404.516 218.454 404.516 229.5V321C404.516 332.046 413.47 341 424.516 341H1323.5"
            stroke="#E5E7EB"
            strokeOpacity="0.8"
            strokeWidth="3"
          />
          {/* Active path - colored */}
          <path
            d="M2 0V189.5C2 200.546 10.9543 209.5 22 209.5H384.192C395.238 209.5 404.192 218.454 404.192 229.5V321C404.192 332.046 413.146 341 424.192 341H1323.5"
            stroke="#10b981"
            strokeOpacity="0.4"
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* Truck Icon - moves from RIGHT to LEFT on the 3rd line (bottom horizontal line) */}
      <motion.div
        className="absolute z-30"
        style={{
          left: useTransform(truckLeftPercent, (v) => `${v}%`),
          bottom: "14%", // Dùng % để responsive theo container height
          scaleX: -1, // Flip xe để quay đầu sang trái
          translateY: "50%", // Center xe theo chiều dọc
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <Image
            src="/xe-icon.png"
            alt="NETCO Truck"
            width={200}
            height={120}
            className="object-contain drop-shadow-xl"
            style={{
              filter: "drop-shadow(0 10px 15px rgb(0 0 0 / 0.1))",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
