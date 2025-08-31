'use client';

import { Card, CardBody, Avatar } from '@nextui-org/react';
import { FaQuoteLeft, FaStar, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sarah & Michael',
    age: '28 & 31',
    location: 'New York, NY',
    story: 'We matched on MatchMe and had our first date within a week. Six months later, we\'re planning our wedding! The platform really understands what makes people compatible.',
    avatar1: '/images/f1.jpg',
    avatar2: '/images/m1.jpg',
    rating: 5,
    relationship: 'Engaged',
    timeframe: '6 months ago'
  },
  {
    id: 2,
    name: 'Jessica & David',
    age: '26 & 29',
    location: 'Los Angeles, CA',
    story: 'After trying other dating apps without success, MatchMe\'s algorithm actually found someone who shares my values and interests. We\'ve been together for a year now!',
    avatar1: '/images/f2.jpg',
    avatar2: '/images/m2.jpg',
    rating: 5,
    relationship: 'In a relationship',
    timeframe: '1 year ago'
  },
  {
    id: 3,
    name: 'Emma & Ryan',
    age: '24 & 27',
    location: 'Chicago, IL',
    story: 'The premium features really made a difference. Being able to see who viewed my profile and having unlimited likes helped me find my perfect match much faster.',
    avatar1: '/images/f3.jpg',
    avatar2: '/images/m3.jpg',
    rating: 5,
    relationship: 'Dating',
    timeframe: '8 months ago'
  }
];

const stats = [
  {
    number: '50,000+',
    label: 'Happy Couples',
    icon: <FaHeart className="text-pink-500" size={24} />
  },
  {
    number: '1M+',
    label: 'Messages Sent',
    icon: <FaStar className="text-yellow-500" size={24} />
  },
  {
    number: '95%',
    label: 'Match Success Rate',
    icon: <FaHeart className="text-red-500" size={24} />
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
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
              Success Stories
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Real couples who found love on MatchMe share their amazing journey
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
              <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
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
              <Card className="p-6 h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardBody className="space-y-6">
                  {/* Quote Icon */}
                  <FaQuoteLeft className="text-pink-300" size={32} />
                  
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
                      <div className="inline-flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
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

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-pink-500 to-red-500 text-white">
            <CardBody>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Write Your Love Story?
              </h3>
              <p className="text-xl mb-6 opacity-90">
                Join thousands of couples who found love on MatchMe
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="text-sm opacity-75">
                  ✨ Over 500 success stories this month
                </div>
                <div className="text-sm opacity-75">
                  💝 Average time to find a match: 2 weeks
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}