"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Users,
  TrendingUp,
  Award,
  Cpu,
  Server,
  Gauge,
  CheckCircle2,
} from "lucide-react";
import { PageHero, Section, Container } from "@/components/ui/page-sections";
import { useParams } from "next/navigation";
import InfoSidebar from "@/components/ui/info-sidebar";

export default function AboutPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isVi = locale === "vi";

  const stats = [
    {
      value: "23+",
      label: isVi ? "Năm kinh nghiệm" : "Years of Experience",
      labelEn: "Years Experience",
    },
    {
      value: "60K+",
      label: isVi ? "Khách hàng thường xuyên" : "Regular Customers",
      labelEn: "Regular Customers",
    },
    {
      value: "5K+",
      label: isVi ? "Doanh nghiệp B2B" : "B2B Enterprises",
      labelEn: "B2B Businesses",
    },
    {
      value: "99.9%",
      label: isVi ? "Tỷ lệ giao đúng hẹn" : "On-time Delivery",
      labelEn: "On-time Rate",
    },
  ];

  const highlights = [
    {
      icon: Building2,
      title: isVi ? "Hơn 23 năm kinh nghiệm" : "23+ Years Experience",
      description: isVi
        ? "Trong ngành chuyển phát nhanh, tạo dựng uy tín và chất lượng dịch vụ."
        : "In express delivery industry, building reputation and service quality.",
    },
    {
      icon: Users,
      title: isVi ? "60.000+ Khách hàng" : "60,000+ Customers",
      description: isVi
        ? "Phục vụ thường xuyên và 5.000 doanh nghiệp B2B tin tưởng lựa chọn."
        : "Regular customers and 5,000 B2B businesses trust our services.",
    },
    {
      icon: Award,
      title: isVi ? "Đối tác tin cậy" : "Trusted Partner",
      description: isVi
        ? "Của các tập đoàn lớn, hỗ trợ tối ưu quy trình vận chuyển hàng hóa."
        : "Of major corporations, optimizing their logistics operations.",
    },
  ];

  const technologies = [
    {
      icon: Server,
      title: isVi ? "TMS & WMS" : "TMS & WMS Systems",
      description: isVi
        ? "Hệ thống quản lý vận tải và kho hàng, tăng tốc độ xử lý gấp 5 lần, tối ưu chi phí 30%."
        : "Transport and Warehouse Management Systems, 5x faster processing, 30% cost optimization.",
    },
    {
      icon: Cpu,
      title: isVi ? "Trí tuệ nhân tạo (AI)" : "Artificial Intelligence",
      description: isVi
        ? "Áp dụng AI vào quy trình vận hành và kinh doanh, giúp tối ưu thời gian và chi phí."
        : "Applying AI to operations and business processes for time and cost optimization.",
    },
    {
      icon: Award,
      title: isVi ? "ISO 9001:2015" : "ISO 9001:2015",
      description: isVi
        ? "Hệ thống quản lý chất lượng theo tiêu chuẩn quốc tế, đảm bảo dịch vụ ổn định."
        : "International quality management system ensuring stable service delivery.",
    },
    {
      icon: Gauge,
      title: isVi ? "Hệ thống thông minh" : "Smart Systems",
      description: isVi
        ? "Công nghệ định vị bưu phẩm và thanh toán thông minh, tra cứu đơn hàng dễ dàng."
        : "Package tracking and smart payment technology for easy order tracking.",
    },
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <PageHero
        badge={isVi ? "GIỚI THIỆU" : "ABOUT US"}
        title={isVi ? "Về Chúng Tôi" : "About Us"}
        description={
          isVi
            ? "NETCO Post - Sự lựa chọn hàng đầu cho doanh nghiệp và cá nhân trong lĩnh vực chuyển phát nhanh"
            : "NETCO Post - The premier choice for businesses and individuals in express delivery services"
        }
        variant="gradient"
      />

      {/* Main Content with Sidebar */}
      <Section background="gray" padding="lg">
        <Container size="xl" className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Company Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm mb-8"
              >
                <div className="mb-8">
                  <img
                    src="https://mediaimages-v2.vps.vn/DeliverySignImages/2025/042025////___2025-04-21-08-42-24_1.jpg"
                    alt="NETCO Post"
                    className="w-full rounded-xl mb-6"
                  />
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {isVi ? (
                    <>
                      Được thành lập vào năm 2003,{" "}
                      <strong>
                        Công ty Cổ phần Thương mại và Chuyển phát nhanh Nội Bài
                      </strong>{" "}
                      đã xây dựng thành công thương hiệu Netco Post trong ngành
                      Logistics - một công ty có kinh nghiệm hoạt động chính –
                      Chuyển phát. Netco Post tự hào là thương hiệu có uy tín
                      trong lĩnh vực chuyển phát nhanh tài liệu, hàng hóa trong
                      nước và quốc tế với phương châm phục vụ{" "}
                      <strong>
                        "Vì khách hàng phục vụ, Vì uy tín chuyên cần".
                      </strong>
                    </>
                  ) : (
                    <>
                      Established in 2003,{" "}
                      <strong>
                        Noi Bai Express Trading and Delivery Joint Stock Company
                      </strong>{" "}
                      has successfully built the Netco Post brand in the
                      Logistics industry - a company with experience in express
                      delivery operations. Netco Post is proud to be a reputable
                      brand in express delivery of documents and goods
                      domestically and internationally with the service motto{" "}
                      <strong>
                        "For customers to serve, For dedicated reputation".
                      </strong>
                    </>
                  )}
                </p>

                <h3 className="text-2xl font-bold text-green-dark mb-4">
                  {isVi
                    ? "Netco Post - Sự lựa chọn hàng đầu cho doanh nghiệp và cá nhân"
                    : "Netco Post - The Premier Choice for Businesses and Individuals"}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {isVi
                    ? "Để giữ vững vị thế tiên phong, Netco Post không ngừng đổi mới và hoàn thiện chất lượng dịch vụ."
                    : "To maintain our pioneering position, Netco Post continuously innovates and improves service quality."}
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 md:p-10 shadow-lg mb-8"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                        {stat.value}
                      </p>
                      <p className="text-white/90 text-sm md:text-base">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Key Highlights */}
              <div className="mb-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-sm"
                    >
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                        <highlight.icon className="w-6 h-6 text-green-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-green-dark mb-2">
                        {highlight.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {highlight.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Customer Trust */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm mb-8"
              >
                <div className="mb-6">
                  <img
                    src="https://mediaimages-v2.vps.vn/DeliverySignImages/2025/042025////___2025-04-12-09-53-30_1.jpeg"
                    alt="NETCO Customers"
                    className="w-full rounded-xl"
                  />
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {isVi
                    ? "Với nền tảng vững chắc từ kinh nghiệm thực tiễn, Netco Post đã xây dựng được lòng tin từ đông đảo khách hàng cá nhân và doanh nghiệp. Sự hài lòng của khách hàng chính là động lực để chúng tôi không ngừng cải tiến dịch vụ."
                    : "With a solid foundation from practical experience, Netco Post has built trust from a large number of individual customers and businesses. Customer satisfaction is the driving force for us to continuously improve our services."}
                </p>
              </motion.div>

              {/* Technology Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm mb-8"
              >
                <h2 className="text-3xl font-bold text-green-dark mb-4">
                  {isVi
                    ? "Công nghệ là ngôn ngữ của tương lai"
                    : "Technology is the Language of the Future"}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {isVi
                    ? "Netco Post liên tục cập nhật, cải tiến để thích ứng linh hoạt với nhu cầu của khách hàng, củng cố lòng tin luôn an tâm khi sử dụng dịch vụ của chúng tôi."
                    : "Netco Post continuously updates and innovates to flexibly adapt to customer needs, strengthening trust and peace of mind when using our services."}
                </p>

                <div className="mb-8">
                  <img
                    src="https://mediaimages-v2.vps.vn/DeliverySignImages/2025/042025////___2025-04-21-08-43-44_1.jpg"
                    alt="NETCO Technology"
                    className="w-full rounded-xl mb-6"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {technologies.map((tech, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <tech.icon className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-green-dark mb-2">
                          {tech.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Final Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <img
                  src="https://mediaimages-v2.vps.vn/DeliverySignImages/2025/042025////___2025-04-21-08-43-53_1.jpg"
                  alt="NETCO Services"
                  className="w-full rounded-xl"
                />
              </motion.div>
            </div>

            {/* Sidebar */}
            <InfoSidebar locale={locale} />
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="green" padding="lg">
        <Container size="sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {isVi
                ? "Sẵn sàng làm việc với chúng tôi?"
                : "Ready to Work With Us?"}
            </h2>
            <p className="text-lg text-white/90 mb-6">
              {isVi
                ? "Hãy trở thành một trong hàng ngàn doanh nghiệp tin tưởng sử dụng dịch vụ của NETCO."
                : "Join thousands of businesses that trust NETCO for their logistics needs."}
            </p>
            <a
              href={`/${locale}/contact`}
              className="inline-block bg-white text-green-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {isVi ? "Liên Hệ Ngay" : "Contact Us"}
            </a>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}
