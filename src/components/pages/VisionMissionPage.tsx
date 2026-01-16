"use client";

import { motion } from "framer-motion";
import { Eye, Target, Zap, Heart, Shield, Users, TrendingUp, CheckCircle2, Award, Gauge, Rocket, BarChart3 } from "lucide-react";
import { PageHero, Section, Container } from "@/components/ui/page-sections";
import { useParams } from "next/navigation";
import InfoSidebar from "@/components/ui/info-sidebar";
import Image from "next/image";

export default function VisionMissionPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isVi = locale === "vi";

  const coreValues = {
    title: isVi ? "Giá Trị Cốt Lõi - Động lực thúc đẩy sự phát triển của Netco Post" : "Core Values - Driving Force of Netco Post Development",
    intro: isVi 
      ? "Các Giá trị cốt lõi của Netco Post xoay quanh con người, nhấn mạnh vào năng lượng tích cực, đặt khách hàng làm trọng tâm, áp dụng và bảo vệ các tiêu chuẩn cao về tính chính trực, thúc đẩy tinh thần làm việc nhóm và không ngừng đổi mới, sáng tạo để đạt được lợi thế cạnh tranh."
      : "Netco Post's Core Values revolve around people, emphasizing positive energy, customer focus, upholding high integrity standards, promoting teamwork spirit, and continuous innovation to achieve competitive advantage.",
    values: [
      {
        icon: Zap,
        number: "1",
        title: isVi ? "Năng lượng" : "Energy",
        description: isVi
          ? "Ở Netco Post, sự nhiệt huyết không chỉ là giá trị nội tại, mà còn là động lực giúp chúng tôi mang đến các giải pháp vận chuyển nhanh chóng, hiệu quả, chinh phục từng thử thách cùng khách hàng."
          : "At Netco Post, passion is not just an intrinsic value, but also the driving force that helps us deliver fast, efficient transportation solutions, conquering challenges alongside our customers.",
      },
      {
        icon: Heart,
        number: "2",
        title: isVi ? "Khách hàng là trọng tâm" : "Customer Focus",
        description: isVi
          ? "Chúng tôi hiểu rằng từng kiện hàng là niềm tin mà khách hàng gửi gắm. Vì vậy, Netco Post cam kết phục vụ bằng sự tận tâm và chuyên nghiệp, đảm bảo mọi nhu cầu đều được thực hiện vượt mong đợi."
          : "We understand that each package is the trust customers place in us. Therefore, Netco Post is committed to serving with dedication and professionalism, ensuring all needs are met beyond expectations.",
      },
      {
        icon: Shield,
        number: "3",
        title: isVi ? "Chính trực" : "Integrity",
        description: isVi
          ? "Sự minh bạch và trung thực chính là nền móng giúp Netco Post xây dựng niềm tin lâu dài với khách hàng, biến mỗi giao dịch thành mối quan hệ bền vững."
          : "Transparency and honesty are the foundation that helps Netco Post build long-term trust with customers, turning each transaction into a sustainable relationship.",
      },
      {
        icon: Users,
        number: "4",
        title: isVi ? "Tinh thần đồng đội" : "Teamwork Spirit",
        description: isVi
          ? "Đội ngũ Netco Post không chỉ làm việc cùng nhau mà còn hợp sức để tạo ra giá trị vượt trội, đảm bảo từng khâu vận hành đều đạt đến sự hoàn hảo."
          : "Netco Post team not only works together but also collaborates to create superior value, ensuring every operational step achieves perfection.",
      },
      {
        icon: TrendingUp,
        number: "5",
        title: isVi ? "Đổi mới" : "Innovation",
        description: isVi
          ? "Netco Post không ngừng tiên phong trong việc ứng dụng công nghệ tiên tiến như WMS, TMS và AI, biến đổi mọi thách thức thành lợi thế cạnh tranh để mang đến dịch vụ vận chuyển đẳng cấp."
          : "Netco Post continuously pioneers in applying advanced technologies such as WMS, TMS and AI, transforming all challenges into competitive advantages to deliver world-class shipping services.",
      },
    ],
  };

  const managementPrinciples = {
    title: isVi ? "Nguyên tắc quản trị - Bảo chứng cho sự vận hành vượt trội" : "Management Principles - Guarantee for Superior Operations",
    intro: isVi
      ? "Đối với nguyên tắc quản lý, chúng ta tập trung vào tính linh hoạt toàn cầu và khả năng mở rộng quy mô nhanh và bền vững dựa trên sự dẫn dắt của công nghệ và chuyển đổi số."
      : "For management principles, we focus on global flexibility and rapid, sustainable scalability driven by technology leadership and digital transformation.",
    principles: [
      {
        title: isVi ? "Linh hoạt toàn cầu" : "Global Flexibility",
        description: isVi ? "Khả năng thích ứng nhanh chóng trước mọi thay đổi của thị trường." : "Ability to quickly adapt to all market changes.",
      },
      {
        title: isVi ? "Khả năng mở rộng" : "Scalability",
        description: isVi ? "Đáp ứng nhu cầu vận chuyển của khách hàng ở mọi quy mô, từ nội địa đến quốc tế" : "Meeting customer shipping needs at all scales, from domestic to international",
      },
      {
        title: isVi ? "Đảm bảo sự bền vững" : "Sustainability",
        description: isVi ? "Kết hợp phát triển kinh doanh với trách nhiệm xã hội và môi trường." : "Combining business development with social and environmental responsibility.",
      },
      {
        title: isVi ? "Công nghệ làm động lực" : "Technology-Driven",
        description: isVi ? "Hệ thống quản lý thông minh WMS, TMS, và AI giúp tối ưu hóa quy trình vận hành." : "Smart management systems WMS, TMS, and AI help optimize operational processes.",
      },
    ],
    aspects: [
      {
        title: isVi ? "Triển khai nhất quán" : "Consistent Implementation",
        description: isVi 
          ? "Cơ cấu tổ chức, hệ thống hoạt động, chức năng quản trị, quản lý tài chính, kiểm soát nội bộ và chiến lược tiếp thị của chúng ta đều dựa trên nền tảng nhất quán của Nguyên tắc quản lý."
          : "Our organizational structure, operating systems, governance functions, financial management, internal controls and marketing strategy are all based on the consistent foundation of Management Principles.",
      },
      {
        title: isVi ? "Cân bằng" : "Well Balanced",
        description: isVi
          ? "Các giá trị của chúng ta phải được bảo vệ, giữ gìn và phát triển liên tục. Các hoạt động quản trị phù hợp được áp dụng để đảm bảo tất cả các hoạt động được thực hiện dưới sự kiểm soát và cân bằng, áp dụng cho tất cả các thành viên trong tổ chức, bất kể cấp bậc và thâm niên."
          : "Our values must be protected, maintained and continuously developed. Appropriate governance activities are applied to ensure all operations are conducted under control and balance, applicable to all organization members regardless of rank and seniority.",
      },
      {
        title: isVi ? "Thông thạo" : "Well Versed",
        description: isVi
          ? "Tại Netco Post, mọi thành viên, bao gồm cả Tổng Giám đốc, đều phải thông thạo thực tế vận hành. Các nhà quản lý làm việc với nhân viên vận hành để có sự hiểu biết toàn diện về công việc. Sự đồng lòng trong nội bộ là nền tảng để thực hiện các cam kết với khách hàng."
          : "At Netco Post, every member, including the CEO, must be well-versed in operational reality. Managers work with operational staff to have comprehensive understanding of the work. Internal unity is the foundation for fulfilling commitments to customers.",
      },
    ],
  };

  const qualityPolicy = {
    title: isVi ? "Chính sách chất lượng - Chìa khóa đảm bảo sự hài lòng của khách hàng" : "Quality Policy - Key to Ensuring Customer Satisfaction",
    description: isVi
      ? "Netco Post cam kết đảm bảo mọi nhiệm vụ đều được lên kế hoạch kỹ lưỡng và với các mục tiêu được hiểu rõ. Mỗi công việc chỉ được xác định hoàn thành sau khi xem xét các mục tiêu đã đạt được hay chưa. Dù thực hiện bất kỳ công việc gì, chúng ta luôn tìm cách tốt nhất để thực hiện nhiệm vụ. Chúng ta không ngừng nỗ lực để tìm kiếm ra giải pháp tốt nhất."
      : "Netco Post is committed to ensuring all tasks are carefully planned with clearly understood objectives. Each task is only confirmed complete after reviewing whether objectives have been achieved. Whatever we do, we always seek the best way to execute the task. We continuously strive to find better solutions.",
  };

  const fourP1S = {
    title: isVi ? 'Phẩm chất doanh nghiệp "4P1S"' : 'Enterprise Quality "4P1S"',
    intro: isVi
      ? "Chúng ta tin tưởng Phẩm chất doanh nghiệp 4P1S: Con người (People), Quy trình (Process), Nền tảng (Platform), Sản phẩm (Product) và Tốc độ (Speed); sẽ cung cấp dịch vụ vận chuyển nhanh chóng, chính xác, đáng tin cậy và hiệu quả chi phí."
      : "We believe in 4P1S Enterprise Quality: People, Process, Platform, Product and Speed; will provide fast, accurate, reliable and cost-effective shipping services.",
    elements: [
      {
        icon: Users,
        letter: "P",
        title: isVi ? "Con người (People)" : "People",
        subtitle: isVi ? "Đội ngũ là tài sản, khách hàng là động lực." : "Team is asset, customers are motivation.",
        description: isVi
          ? "Netco Post tự hào sở hữu đội ngũ chuyên nghiệp, tận tâm, luôn đặt chất lượng dịch vụ và sự hài lòng của khách hàng làm mục tiêu cao nhất."
          : "Netco Post is proud to have a professional, dedicated team that always puts service quality and customer satisfaction as the highest priority.",
      },
      {
        icon: CheckCircle2,
        letter: "P",
        title: isVi ? "Quy trình (Processes)" : "Processes",
        subtitle: isVi ? "Mọi bước đều chặt chẽ, mọi hành trình đều hoàn hảo." : "Every step is rigorous, every journey is perfect.",
        description: isVi
          ? "Từ tiếp nhận đơn hàng đến giao hàng tận tay, quy trình của Netco Post được tối ưu hóa để đảm bảo sự đồng bộ, chính xác và hiệu quả trong từng khâu."
          : "From order receipt to hand delivery, Netco Post's processes are optimized to ensure synchronization, accuracy and efficiency in every step.",
      },
      {
        icon: BarChart3,
        letter: "P",
        title: isVi ? "Nền tảng (Platforms)" : "Platforms",
        subtitle: isVi ? "Công nghệ là nền móng cho sự bứt phá." : "Technology is the foundation for breakthroughs.",
        description: isVi
          ? "Hệ thống quản lý hiện đại như WMS, TMS, kết hợp trí tuệ nhân tạo (AI) giúp Netco Post vận hành thông minh, đồng bộ và an toàn tuyệt đối."
          : "Modern management systems like WMS, TMS, combined with artificial intelligence (AI) help Netco Post operate intelligently, synchronously and absolutely safely.",
      },
      {
        icon: Award,
        letter: "P",
        title: isVi ? "Sản phẩm (Products)" : "Products",
        subtitle: isVi ? "Mọi nhu cầu vận chuyển với giải pháp phù hợp." : "Every shipping need with suitable solution.",
        description: isVi
          ? "Netco Post cung cấp đa dạng các gói dịch vụ, từ giao nhận nội địa đến quốc tế, đáp ứng linh hoạt mọi nhu cầu của cá nhân và doanh nghiệp."
          : "Netco Post provides diverse service packages, from domestic to international delivery, flexibly meeting all needs of individuals and businesses.",
      },
      {
        icon: Rocket,
        letter: "S",
        title: isVi ? "Tốc độ (Speed)" : "Speed",
        subtitle: isVi ? "Nhanh không chỉ là lời hứa, mà là tiêu chuẩn." : "Speed is not just a promise, but a standard.",
        description: isVi
          ? "Với đội ngũ giàu kinh nghiệm và nền tảng công nghệ tiên tiến, Netco Post cam kết giao hàng đúng hẹn, mang lại sự hài lòng trong từng giây phút chờ đợi."
          : "With an experienced team and advanced technology platform, Netco Post is committed to on-time delivery, bringing satisfaction in every moment of waiting.",
      },
    ],
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <PageHero
        badge={isVi ? "VỀ NETCO" : "ABOUT NETCO"}
        title={isVi ? "Tầm Nhìn & Sứ Mệnh" : "Vision & Mission"}
        description={
          isVi
            ? "Khám phá giá trị cốt lõi, nguyên tắc quản trị và chính sách chất lượng định hướng sự phát triển của NETCO"
            : "Discover core values, management principles and quality policies that guide NETCO's development"
        }
        variant="gradient"
      />

      {/* Hero Image */}
      <Section background="white" padding="sm" className="hidden lg:block">
        <Container size="xl">
          <div className=" relative w-full h-[300px] md:h-[450px] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/btnsm.jpg"
              alt={isVi ? "Tầm nhìn và sứ mệnh" : "Vision and Mission"}
              fill
              className="object-cover"
              priority
            />
          </div>
        </Container>
      </Section>

      {/* Main Content with Sidebar */}
      <Section background="gray" padding="lg">
        <Container size="xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Introduction with image on right */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm mb-8"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {coreValues.intro}
                    </p>
                  </div>
                  <div className="w-full md:w-2/5 shrink-0">
                    <Image
                      src="/images/tlkd.png"
                      alt={isVi ? "Tại sao và chúng ta thực hiện như thế nào?" : "Why and how do we do it?"}
                      width={600}
                      height={400}
                      className="w-full rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Core Values with image at top */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 md:p-10 shadow-lg mb-8"
              >
             

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                  {coreValues.title}
                </h2>
                <div className="space-y-6">
                  {coreValues.values.map((value, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                    >
                      <div className="flex items-start gap-4">
                        <div className="shrink-0">
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                            <value.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl font-bold text-white/80">{value.number}.</span>
                            <h3 className="text-xl font-bold text-white">
                              {value.title}
                            </h3>
                          </div>
                          <p className="text-white/90 leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Management Principles - image on left side */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm mb-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-green-dark mb-4">
                  {managementPrinciples.title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {managementPrinciples.intro}
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {managementPrinciples.principles.map((principle, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-green-dark mb-1">{principle.title}</h4>
                        <p className="text-sm text-gray-600">{principle.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Image and aspects side by side */}
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="w-full md:w-2/5 shrink-0">
                    <Image
                      src="/images/nguyentacquantri.jpg"
                      alt={isVi ? "Nguyên tắc quản trị" : "Management Principles"}
                      width={400}
                      height={500}
                      className="w-full rounded-xl h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    {managementPrinciples.aspects.map((aspect, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl"
                      >
                        <h3 className="text-lg font-bold text-green-dark mb-2">
                          {aspect.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {aspect.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Quality Policy - image on right */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm mb-8"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-green-dark mb-6">
                  {qualityPolicy.title}
                </h2>
                
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-1">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {qualityPolicy.description}
                    </p>
                  </div>
                  <div className="w-full md:w-2/5 shrink-0">
                    <Image
                      src="/images/cscl.jpg"
                      alt={isVi ? "Chính sách chất lượng" : "Quality Policy"}
                      width={400}
                      height={400}
                      className="w-full rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>

              {/* 4P1S Section - images between title and content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 md:p-10 shadow-sm"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-green-dark mb-4 text-center">
                  {fourP1S.title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
                  {fourP1S.intro}
                </p>

                {/* Two images in a row */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="relative h-[200px] md:h-[400px] rounded-xl overflow-hidden">
                    <Image
                      src="/images/dacdiemdoanhnghiep.jpg"
                      alt={isVi ? "Đặc điểm doanh nghiệp" : "Enterprise Characteristics"}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative h-[200px] md:h-[400px] rounded-xl overflow-hidden">
                    <Image
                      src="/images/phamchat.jpg"
                      alt={isVi ? "Phẩm chất 4P1S" : "4P1S Quality"}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* 4P1S Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  {fourP1S.elements.map((element, idx) => {
                    // Định nghĩa màu cho từng element dựa vào hình phamchat.jpg
                    const colorSchemes = [
                      { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-600', text: 'text-blue-700', letter: 'text-blue-600' }, // 01 People - Xanh dương đậm
                      { bg: 'bg-cyan-50', border: 'border-cyan-200', icon: 'bg-cyan-500', text: 'text-cyan-700', letter: 'text-cyan-600' }, // 02 Process - Xanh cyan
                      { bg: 'bg-teal-50', border: 'border-teal-200', icon: 'bg-teal-400', text: 'text-teal-700', letter: 'text-teal-500' }, // 03 Platform - Xanh ngọc
                      { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: 'bg-emerald-500', text: 'text-emerald-700', letter: 'text-emerald-600' }, // 04 Product - Xanh lục lam
                      { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-500', text: 'text-green-700', letter: 'text-green-600' }, // 05 Speed - Xanh lá
                    ];
                    const colors = colorSchemes[idx];
                    
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className={`${colors.bg} rounded-xl p-6 border ${colors.border} hover:shadow-md transition-shadow`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0">
                            <div className={`w-14 h-14 ${colors.icon} rounded-xl flex items-center justify-center shadow-md`}>
                              <element.icon className="w-7 h-7 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`text-2xl font-bold ${colors.letter}`}>{element.letter}</span>
                              <h3 className="text-xl font-bold text-gray-800">
                                {element.title}
                              </h3>
                            </div>
                            <p className={`text-sm font-medium ${colors.text} mb-2`}>
                              {element.subtitle}
                            </p>
                            <p className="text-gray-600 leading-relaxed text-sm">
                              {element.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <InfoSidebar locale={locale} />
          </div>
        </Container>
      </Section>

    </main>
  );
}
