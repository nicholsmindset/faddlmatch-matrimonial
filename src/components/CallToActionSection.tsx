'use client';

import { Button, Card, CardBody } from '@nextui-org/react';
import { FaHeart, FaUsers, FaShieldAlt, FaMobile } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FaHeart className="text-pink-500" size={24} />,
    title: 'Smart Matching',
    description: 'AI-powered algorithm finds your perfect match'
  },
  {
    icon: <FaUsers className="text-blue-500" size={24} />,
    title: 'Active Community',
    description: '100k+ verified singles actively dating'
  },
  {
    icon: <FaShieldAlt className="text-green-500" size={24} />,
    title: 'Safe & Secure',
    description: 'Identity verification and 24/7 moderation'
  },
  {
    icon: <FaMobile className="text-purple-500" size={24} />,
    title: 'Mobile First',
    description: 'Seamless experience across all devices'
  }
];

export default function CallToActionSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Card className="p-12 bg-gradient-to-br from-pink-500 via-red-500 to-pink-600 text-white shadow-2xl">
            <CardBody className="space-y-8">
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold"
              >
                Your Love Story
                <br />
                <span className="text-pink-100">Starts Today</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl md:text-2xl text-pink-100 max-w-3xl mx-auto leading-relaxed"
              >
                Join over 100,000 singles who trust MatchMe to find meaningful connections. 
                Our advanced matching system has helped thousands find their perfect partner.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              >
                <Button
                  as={Link}
                  href="/register"
                  size="lg"
                  className="bg-white text-pink-600 text-xl px-12 py-8 rounded-full font-bold hover:bg-pink-50 transform hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
                >
                  Start Your Journey Free
                </Button>
                <Button
                  as={Link}
                  href="/register?plan=premium"
                  size="lg" 
                  className="bg-yellow-500 text-white text-xl px-12 py-8 rounded-full font-bold hover:bg-yellow-400 transform hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
                >
                  Go Premium - $17/month
                </Button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-6 text-pink-100 text-sm pt-4"
              >
                <span>✨ No credit card required</span>
                <span>💖 Start chatting immediately</span>
                <span>🚀 Join 1000+ daily signups</span>
              </motion.div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-pink-500">
                <CardBody className="text-center space-y-4">
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Trusted by Singles Worldwide</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-pink-600">50k+</div>
                <div className="text-gray-600">Success Stories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">4.8★</div>
                <div className="text-gray-600">App Store Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">24/7</div>
                <div className="text-gray-600">Customer Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600">100%</div>
                <div className="text-gray-600">Privacy Protected</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}