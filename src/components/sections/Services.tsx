"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    number: "01",
    title: "Vận tải hàng không",
    description:
      "Chúng tôi giúp bạn dễ dàng tìm kiếm các giải pháp lưu trữ hàng hóa bằng vận tải hàng không.",
    image: "/xe-oto.png",
    link: "/services/air-freight",
  },
  {
    number: "02",
    title: "Vận tải đường bộ",
    description:
      "Vận tải đường bộ đóng vai trò vô cùng quan trọng trong việc vận chuyển hàng hóa và con người.",
    image: "/xe-oto.png",
    link: "/services/road-freight",
  },
  {
    number: "03",
    title: "Vận tải đường biển",
    description:
      "Thương mại toàn cầu vận chuyển hiệu quả nhiều loại hàng hóa khác nhau trên khắp các vùng biển quốc tế.",
    image: "/xe-oto.png",
    link: "/services/ocean-freight",
  },
  {
    number: "04",
    title: "Vận tải đường sắt",
    description:
      "Giải pháp vận tải đường sắt kết nối các khu kinh tế lớn, thân thiện với môi trường.",
    image: "/xe-oto.png",
    link: "/services/rail-freight",
  },
  {
    number: "05",
    title: "Dịch vụ kho bãi",
    description:
      "Hệ thống kho bãi hiện đại, đáp ứng nhu cầu lưu trữ và quản lý hàng hóa chuyên nghiệp.",
    image: "/xe-oto.png",
    link: "/services/warehousing",
  },
  {
    number: "06",
    title: "Giao hàng nhanh",
    description:
      "Dịch vụ giao hàng nhanh trong ngày, đảm bảo hàng hóa đến tay khách hàng đúng hẹn.",
    image: "/xe-oto.png",
    link: "/services/express-delivery",
  },
];

export default function Services() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-dark">
            Dịch vụ vận chuyển và hậu cần
          </h2>
        </motion.div>

        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={service.link}>
                <div className="group flex flex-col md:grid md:grid-cols-12 items-start md:items-center py-6 md:py-10 border-b border-gray-200 transition-colors duration-300 cursor-pointer gap-3 md:gap-0">
                  {/* Left - Number & Description */}
                  <div className="md:col-span-3">
                    <span className="text-green-primary font-medium text-base md:text-lg mb-1 md:mb-2 block">
                      {service.number}
                    </span>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed md:pr-4 hidden md:block">
                      {service.description}
                    </p>
                  </div>

                  {/* Center - Title */}
                  <div className="md:col-span-5 flex items-center justify-start md:justify-center w-full">
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-gray-400 group-hover:text-green-dark transition-colors duration-300"
                      style={{ fontFamily: "serif" }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Right - Icon (appears on hover - desktop only) */}
                  <div className="hidden md:flex md:col-span-3 items-center justify-center">
                    <div className="relative w-24 h-16 md:w-32 md:h-20 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex md:col-span-1 items-center justify-end">
                    <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-green-primary group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
