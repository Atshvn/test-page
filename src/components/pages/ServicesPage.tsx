"use client";

import { motion } from "framer-motion";
import {
  Plane,
  Truck,
  Ship,
  Train,
  Package,
  Clock,
  Shield,
  Headphones,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Plane,
    title: "Air Freight",
    description:
      "Fast and reliable air freight services for time-sensitive cargo. Our global network ensures your shipments reach any destination worldwide with speed and precision.",
    features: [
      "Express delivery options",
      "Real-time tracking",
      "Temperature-controlled cargo",
      "Dangerous goods handling",
    ],
    color: "bg-green-500",
    link: "/services/air-freight",
  },
  {
    icon: Truck,
    title: "Road Freight",
    description:
      "Comprehensive road transportation solutions with flexible pickup and delivery options. We cover major routes across continents with our modern fleet.",
    features: [
      "Full truckload (FTL)",
      "Less than truckload (LTL)",
      "Express road delivery",
      "Cross-border transport",
    ],
    color: "bg-orange-500",
    link: "/services/road-freight",
  },
  {
    icon: Ship,
    title: "Ocean Freight",
    description:
      "Cost-effective sea freight for large shipments. We offer full container and less-than-container load options for all your maritime shipping needs.",
    features: [
      "FCL & LCL shipping",
      "Port-to-port service",
      "Door-to-door delivery",
      "Customs clearance",
    ],
    color: "bg-green-500",
    link: "/services/ocean-freight",
  },
  {
    icon: Train,
    title: "Rail Freight",
    description:
      "Efficient rail transportation connecting major economic zones. An eco-friendly alternative for bulk cargo with competitive transit times.",
    features: [
      "Intermodal solutions",
      "Block train services",
      "Containerized cargo",
      "Heavy lift transport",
    ],
    color: "bg-purple-500",
    link: "/services/rail-freight",
  },
];

const benefits = [
  {
    icon: Package,
    title: "Secure Handling",
    description:
      "Your cargo is handled with utmost care and security throughout the journey.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "We guarantee timely delivery with our efficient logistics network.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description: "All shipments are fully insured for your peace of mind.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our dedicated team is available round the clock to assist you.",
  },
];

export default function ServicesPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-green-100 text-green-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-dark mb-6">
              Comprehensive Freight Solutions
            </h1>
            <p className="text-xl text-gray-600">
              We offer a complete range of logistics services tailored to meet
              your specific business needs, ensuring your cargo reaches its
              destination safely and on time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div
                    className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-green-dark mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-green-primary hover:bg-green-dark text-white">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div
                  className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center">
                    <service.icon className="w-24 h-24 text-gray-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-green-dark mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We go above and beyond to ensure your logistics experience is
              seamless.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm text-center"
              >
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-green-primary" />
                </div>
                <h3 className="text-xl font-bold text-green-dark mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Ship Your Cargo?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Get a free quote today and experience world-class logistics
              services.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-orange-primary hover:bg-orange-600 text-white px-8"
            >
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
