"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Warehouse, Truck, Globe, Star } from "lucide-react";

const stats = [
  {
    icon: Warehouse,
    value: 50,
    suffix: "+",
    label: "Warehouses",
    color: "bg-green-100 text-green-primary",
  },
  {
    icon: Truck,
    value: 500,
    suffix: "+",
    label: "Vehicles",
    color: "bg-orange-100 text-orange-primary",
  },
  {
    icon: Globe,
    value: 80,
    suffix: "+",
    label: "Countries",
    color: "bg-green-100 text-green-primary",
  },
  {
    icon: Star,
    value: 10000,
    suffix: "+",
    label: "Happy Reviews",
    color: "bg-purple-100 text-purple-600",
  },
];

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
              >
                <stat.icon className="w-8 h-8" />
              </div>
              <p className="text-4xl md:text-5xl font-bold text-green-dark mb-2">
                <CountUp end={stat.value} />
                {stat.suffix}
              </p>
              <p className="text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
