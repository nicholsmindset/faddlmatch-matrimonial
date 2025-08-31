'use client';

import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { FaCheck, FaHeart, FaStar, FaCrown, FaInfinity } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

const packages = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Get started with basic matching',
    icon: <FaHeart className="text-pink-500" size={32} />,
    features: [
      'Create your profile',
      'Browse member profiles',
      '5 likes per day',
      'Basic matching algorithm',
      'View who liked you (limited)',
    ],
    limitations: [
      'Limited daily likes',
      'Basic search filters',
      'Standard support'
    ],
    buttonText: 'Start Free',
    buttonColor: 'bg-gradient-to-r from-pink-500 to-red-500',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 17,
    description: 'Unlock premium features and find love faster',
    icon: <FaCrown className="text-yellow-500" size={32} />,
    features: [
      'Everything in Free',
      'Unlimited likes',
      'Advanced search filters',
      'See who viewed your profile',
      'Priority customer support',
      'Boost your profile visibility',
      'Send unlimited messages',
      'Advanced matching algorithm',
      'Remove ads',
    ],
    highlights: [
      'Most popular choice',
      '3x more matches on average',
      'Priority profile visibility'
    ],
    buttonText: 'Go Premium',
    buttonColor: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    popular: true,
  },
];

export default function PricingPackages() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
              Choose Your Plan
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Start free and upgrade when you&apos;re ready to unlock your dating potential
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
                    Most Popular
                  </div>
                </div>
              )}
              
              <Card 
                className={`p-6 h-full transition-all duration-300 hover:shadow-2xl ${
                  pkg.popular 
                    ? 'border-2 border-yellow-400 shadow-xl scale-105' 
                    : 'border border-gray-200 hover:border-pink-200'
                }`}
              >
                <CardHeader className="flex flex-col items-center text-center pb-6">
                  <div className="mb-4">{pkg.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900">{pkg.name}</h3>
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
                        <FaInfinity size={20} />
                        <span className="ml-2 font-semibold">Forever Free</span>
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
                        Why Premium?
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

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <FaCheck className="text-green-500" />
                      What&apos;s Included:
                    </h4>
                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <FaCheck className="text-green-500 mt-1 flex-shrink-0" size={14} />
                          <span className="text-gray-700">{feature}</span>
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
                        Cancel anytime • No hidden fees • 7-day free trial
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
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <FaHeart className="text-pink-500" />
              <span>Trusted by 50k+ singles</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              <span>4.8/5 App Store Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-500" />
              <span>SSL Encrypted & Secure</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}