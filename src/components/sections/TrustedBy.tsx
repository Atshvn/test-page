"use client";

import { motion } from "framer-motion";

const clients = [
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "FedEx",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/FedEx_Corporation_-_2016_Logo.svg",
  },
  {
    name: "DHL",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ac/DHL_Logo.svg",
  },
  {
    name: "UPS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/United_Parcel_Service_logo_2014.svg",
  },
  {
    name: "Maersk",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Maersk_Group_Logo.svg",
  },
];

export default function TrustedBy() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-gray-500 text-lg">
            Trusted by leading companies worldwide
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-12">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <div className="h-12 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">
                  {client.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
