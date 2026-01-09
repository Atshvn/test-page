"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  PackageSearch,
  Warehouse,
  Truck,
  PackageCheck,
  FileCheck,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "Bước 1",
    title: "Tạo đơn hàng",
    description: "Khách hàng đăng ký đơn hàng trực tuyến hoặc liên hệ hotline",
  },
  {
    icon: PackageSearch,
    step: "Bước 2",
    title: "Tiếp nhận & Kiểm tra",
    description:
      "Tiếp nhận đơn hàng và tiến hành kiểm tra theo từng yêu cầu khách hàng",
  },
  {
    icon: Warehouse,
    step: "Bước 3",
    title: "Phân loại & Phân tuyến",
    description: "Vận chuyển về kho để chia chọn và tiến hành phân tuyến",
  },
  {
    icon: Truck,
    step: "Bước 4",
    title: "Trung chuyển",
    description: "Trung chuyển hàng hóa đến các điểm đích trên toàn quốc",
  },
  {
    icon: PackageCheck,
    step: "Bước 5",
    title: "Phát hàng & Thu hồi",
    description:
      "Phát hàng, đồng kiểm, thu hồi chứng từ theo yêu cầu và cập nhật báo phát",
  },
  {
    icon: FileCheck,
    step: "Bước 6",
    title: "Báo cáo & Hoàn tất",
    description: "Tổng hợp báo cáo, trả báo phát và biên bản cho khách hàng",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block bg-green-100 text-green-primary px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-4">
            Quy trình hoạt động
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-green-dark mb-4">
            Cách thức hoạt động
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-lg px-4">
            Quy trình vận chuyển chuyên nghiệp, minh bạch từ khi tiếp nhận đến
            khi hoàn tất giao hàng
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-3 md:gap-4">
                {/* Icon */}
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-primary rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <span className="text-xs md:text-sm text-green-primary font-medium">
                    {step.step}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-green-dark mt-1 mb-1 md:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
