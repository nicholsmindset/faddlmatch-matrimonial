'use client';

import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { FaCheck, FaHeart, FaStar, FaCrown, FaMosque, FaUserShield, FaEye, FaUsers } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

const packages = [
  {
    id: 'free',
    name: 'Free Nikah',
    price: 0,
    description: 'Start your halal journey to marriage',
    icon: <FaMosque className="text-green-600" size={32} />,
    features: [
      'Create Islamic profile with values',
      'Browse marriage-minded Muslims',
      '5 halal connections per day',
      'Basic Islamic compatibility matching',
      'Family-friendly interface',
      'Prayer times integration',
    ],
    islamicFeatures: [
      'Islamic values questionnaire',
      'Modest profile creation',
      'Basic wali notification'
    ],
    buttonText: 'Start Halal Journey',
    buttonColor: 'bg-gradient-to-r from-green-600 to-green-700',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium Nikah',
    price: 17,
    description: 'Complete Islamic marriage solution',
    icon: <FaCrown className="text-yellow-500" size={32} />,
    features: [
      'Everything in Free Nikah',
      'Unlimited halal connections',
      'Advanced Islamic compatibility',
      'Family & wali integration',
      'Privacy protection controls',
      'Priority halal support',
      'Islamic calendar integration',
      'Marriage-focused messaging',
      'Religious practice matching',
      'Community verification',
    ],
    islamicFeatures: [
      'Full wali integration & oversight',
      'Advanced privacy controls',
      'Islamic marriage counselor access',
      'Family involvement tools',
      'Religious compatibility scoring'
    ],
    highlights: [
      'Most popular for serious Muslims',
      '5x more marriage proposals',
      'Family-approved connections'
    ],
    buttonText: 'Go Premium Halal',
    buttonColor: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    popular: true,
  },
];

export default function IslamicPricingPackages() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <FaMosque className="text-green-600 mx-auto mb-4" size={48} />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
              Choose Your Halal Plan
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Find your life partner the Islamic way with plans designed for marriage-minded Muslims 
            and their families
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <FaStar size={16} />
                    Most Popular for Marriage
                  </div>
                </div>
              )}
              
              <Card 
                className={`p-6 h-full transition-all duration-300 hover:shadow-2xl ${
                  pkg.popular 
                    ? 'border-2 border-yellow-400 shadow-xl scale-105 bg-gradient-to-b from-yellow-50 to-orange-50' 
                    : 'border-2 border-green-200 hover:border-green-400 bg-gradient-to-b from-green-50 to-white'
                }`}
              >
                <CardHeader className="flex flex-col items-center text-center pb-6">
                  <div className="mb-4">{pkg.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    {pkg.name}
                    {pkg.popular && <FaStar className="text-yellow-500" size={20} />}
                  </h3>
                  <p className="text-gray-600 mt-2">{pkg.description}</p>
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-center">
                      <span className="text-5xl font-bold text-gray-900">
                        ${pkg.price}
                      </span>
                      {pkg.price > 0 && (
                        <span className="text-gray-500 ml-2">/month</span>
                      )}
                    </div>
                    {pkg.price === 0 && (
                      <div className="flex items-center justify-center mt-2 text-green-600">
                        <FaMosque size={20} />
                        <span className="ml-2 font-semibold">Free Forever - Barakallahu</span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardBody className="pt-0">
                  {/* Highlights for Premium */}
                  {pkg.highlights && (
                    <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                        <FaStar className="text-yellow-500" />
                        Why Premium Halal?
                      </h4>
                      <ul className="space-y-1">
                        {pkg.highlights.map((highlight, idx) => (
                          <li key={idx} className="text-yellow-700 text-sm">
                            • {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Islamic Features */}
                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <FaMosque className="text-green-600" />
                      Islamic Features:
                    </h4>
                    <ul className="space-y-2">
                      {pkg.islamicFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <FaCheck className="text-green-600 mt-1 flex-shrink-0" size={12} />
                          <span className="text-green-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* General Features */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <FaCheck className="text-green-500" />
                      Complete Features:
                    </h4>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <FaCheck className="text-green-500 mt-1 flex-shrink-0" size={14} />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-8">
                    <Button
                      as={Link}
                      href={pkg.price === 0 ? "/register" : "/register?plan=premium"}
                      className={`w-full text-white text-lg py-6 rounded-xl font-semibold ${pkg.buttonColor} hover:opacity-90 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl`}
                    >
                      {pkg.buttonText}
                    </Button>
                  </div>

                  {pkg.price > 0 && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-500">
                        Cancel anytime • Halal guarantee • 7-day Islamic trial
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Signals */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <FaMosque className="text-green-600" />
              <span>Trusted by 25k+ Muslim families</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUserShield className="text-blue-600" />
              <span>Wali-approved platform</span>
            </div>
            <div className="flex items-center gap-2">
              <FaHeart className="text-pink-500" />
              <span>5,000+ Islamic marriages</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-500" />
              <span>Halal & Family-Safe</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}