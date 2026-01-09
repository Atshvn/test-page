"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Package,
  Truck,
  MapPin,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const sampleTracking = {
  trackingNumber: "CRG123456789",
  status: "In Transit",
  origin: "New York, USA",
  destination: "Los Angeles, USA",
  estimatedDelivery: "Jan 12, 2026",
  weight: "25.5 kg",
  service: "Road Freight",
  timeline: [
    {
      status: "Order Placed",
      location: "New York, NY",
      date: "Jan 8, 2026",
      time: "09:30 AM",
      completed: true,
    },
    {
      status: "Package Picked Up",
      location: "New York, NY",
      date: "Jan 8, 2026",
      time: "02:45 PM",
      completed: true,
    },
    {
      status: "In Transit",
      location: "Chicago, IL",
      date: "Jan 9, 2026",
      time: "08:15 AM",
      completed: true,
      current: true,
    },
    {
      status: "Out for Delivery",
      location: "Los Angeles, CA",
      date: "Jan 11, 2026",
      time: "--",
      completed: false,
    },
    {
      status: "Delivered",
      location: "Los Angeles, CA",
      date: "Jan 12, 2026",
      time: "--",
      completed: false,
    },
  ],
};

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setShowResult(true);
    }
  };

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
              Track & Trace
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-dark mb-6">
              Track Your Shipment
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Enter your tracking number to get real-time updates on your
              shipment status.
            </p>

            {/* Tracking Form */}
            <form onSubmit={handleTrack} className="max-w-2xl mx-auto">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Enter tracking number (e.g., CRG123456789)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="pl-12 h-14 text-lg border-gray-200"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-orange-primary hover:bg-orange-600 text-white h-14 px-8 text-lg"
                >
                  Track
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Tracking Result */}
      {showResult && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Status Header */}
              <div className="bg-green-50 p-8 rounded-2xl mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <p className="text-gray-600 mb-1">Tracking Number</p>
                    <h2 className="text-2xl font-bold text-green-dark">
                      {sampleTracking.trackingNumber}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-600">Status</p>
                      <p className="text-xl font-bold text-green-600">
                        {sampleTracking.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Shipment Details */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-green-dark mb-6">
                      Shipment Details
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Origin</span>
                        <span className="font-medium text-green-dark">
                          {sampleTracking.origin}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Destination</span>
                        <span className="font-medium text-green-dark">
                          {sampleTracking.destination}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Est. Delivery</span>
                        <span className="font-medium text-green-dark">
                          {sampleTracking.estimatedDelivery}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight</span>
                        <span className="font-medium text-green-dark">
                          {sampleTracking.weight}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Service</span>
                        <span className="font-medium text-green-dark">
                          {sampleTracking.service}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-bold text-green-dark mb-6">
                    Tracking History
                  </h3>
                  <div className="space-y-0">
                    {sampleTracking.timeline.map((event, index) => (
                      <div
                        key={index}
                        className="relative flex gap-4 pb-8 last:pb-0"
                      >
                        {/* Line */}
                        {index < sampleTracking.timeline.length - 1 && (
                          <div
                            className={`absolute left-5 top-10 w-0.5 h-full -translate-x-1/2 ${
                              event.completed ? "bg-green-500" : "bg-gray-200"
                            }`}
                          />
                        )}

                        {/* Icon */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            event.current
                              ? "bg-green-primary text-white"
                              : event.completed
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {event.completed ? (
                            event.current ? (
                              <Truck className="w-5 h-5" />
                            ) : (
                              <CheckCircle className="w-5 h-5" />
                            )
                          ) : (
                            <Clock className="w-5 h-5" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                              <p
                                className={`font-semibold ${
                                  event.current
                                    ? "text-green-primary"
                                    : "text-green-dark"
                                }`}
                              >
                                {event.status}
                              </p>
                              <p className="text-gray-600 flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                              </p>
                            </div>
                            <div className="text-sm text-gray-500">
                              <p>{event.date}</p>
                              <p>{event.time}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <AlertCircle className="w-12 h-12 text-green-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-dark mb-4">
              Need Help?
            </h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about your shipment or need assistance
              with tracking, our customer support team is here to help 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-primary hover:bg-green-dark text-white">
                Contact Support
              </Button>
              <Button
                variant="outline"
                className="border-green-primary text-green-primary hover:bg-green-50"
              >
                View FAQs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
