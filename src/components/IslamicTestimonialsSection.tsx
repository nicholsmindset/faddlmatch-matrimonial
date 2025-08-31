'use client';

import { Card, CardBody, Avatar } from '@nextui-org/react';
import { FaQuoteLeft, FaStar, FaHeart, FaMosque, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Siti & Rahman',
    age: '32 & 35',
    location: 'Singapore',
    story: 'AlhamduliLlah, after my divorce, I thought I would never find happiness again. FADDL MATCH understood my journey and connected me with someone who values family and has been through similar experiences.',
    avatar1: '/images/f1.jpg',
    avatar2: '/images/m1.jpg',
    rating: 5,
    relationship: 'Married',
    timeframe: '1 year ago',
    islamicNote: 'Second chance at happiness with Islamic values'
  },
  {
    id: 2,
    name: 'Maryam & Iskandar',
    age: '29 & 31',
    location: 'Singapore',
    story: 'As a widowed mother, I was hesitant about remarriage. FADDL MATCH created a safe space where my children and family could be part of the process. We found someone who truly understands our situation.',
    avatar1: '/images/f2.jpg',
    avatar2: '/images/m2.jpg',
    rating: 5,
    relationship: 'Engaged',
    timeframe: '8 months ago',
    islamicNote: 'Blended family with Islamic guidance'
  },
  {
    id: 3,
    name: 'Aishah & Zulkifli',
    age: '35 & 38',
    location: 'Singapore',
    story: 'Both having been through divorce, we understood each other\'s journey. FADDL MATCH helped us find love again while respecting our past experiences and focusing on building a beautiful future together.',
    avatar1: '/images/f3.jpg',
    avatar2: '/images/m3.jpg',
    rating: 5,
    relationship: 'Married with children',
    timeframe: '2 years ago',
    islamicNote: 'Building a new family with wisdom and love'
  }
];

const stats = [
  {
    number: '800+',
    label: 'Successful Remarriages',
    icon: <FaMosque className="text-green-600" size={24} />
  },
  {
    number: '5K+',
    label: 'Singapore Muslim Families',
    icon: <FaUsers className="text-blue-600" size={24} />
  },
  {
    number: '95%',
    label: 'Family Approval',
    icon: <FaHeart className="text-pink-500" size={24} />
  }
];

export default function IslamicTestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-blue-50">
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
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-green-600 to-blue-600 text-transparent bg-clip-text">
              Islamic Marriage Success Stories
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Real Muslim couples who found their life partners through our halal platform, 
            with family blessings and Islamic values
          </motion.p>
        </div>

        {/* Success Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow border border-green-200">
                <CardBody className="items-center">
                  <div className="mb-4">{stat.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </CardBody>
              </Card>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="p-6 h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-200">
                <CardBody className="space-y-6">
                  {/* Quote Icon */}
                  <FaQuoteLeft className="text-green-400" size={32} />
                  
                  {/* Story */}
                  <p className="text-gray-700 italic leading-relaxed">
                    &quot;{testimonial.story}&quot;
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" size={16} />
                    ))}
                  </div>
                  
                  {/* Islamic Note */}
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-green-700">
                      <FaMosque size={14} />
                      <span className="text-sm font-medium">{testimonial.islamicNote}</span>
                    </div>
                  </div>
                  
                  {/* Couple Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar src={testimonial.avatar1} size="sm" />
                        <Avatar src={testimonial.avatar2} size="sm" />
                      </div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">Ages {testimonial.age}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                        <FaHeart size={12} />
                        {testimonial.relationship}
                      </div>
                      <p className="text-xs text-gray-400">{testimonial.timeframe}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Islamic Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardBody>
              <FaMosque className="mx-auto mb-4 text-white" size={40} />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready for Your Islamic Love Story?
              </h3>
              <p className="text-xl mb-6 opacity-90">
                Join thousands of Muslim families finding halal marriages with dignity and respect
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <FaMosque size={16} />
                  <span>100% Halal Process</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers size={16} />
                  <span>Family Involvement Welcome</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaHeart size={16} />
                  <span>Marriage-Focused Community</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}