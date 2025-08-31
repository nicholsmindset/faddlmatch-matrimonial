'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { FaMosque, FaUserShield, FaEye, FaHeart, FaUsers, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    id: 1,
    icon: <FaMosque className="text-green-600" size={32} />,
    title: 'Respectful Matching',
    description: 'Thoughtful connections through question-based analysis',
    details: [
      'Halal approach to finding a life partner',
      'Emphasis on character over appearance', 
      'Understanding of previous marriage experiences',
      'Islamic compatibility matching'
    ],
    color: 'border-green-500 bg-green-50'
  },
  {
    id: 2,
    icon: <FaUserShield className="text-blue-600" size={32} />,
    title: 'Wali Integration',
    description: 'Optional guardian involvement and family oversight',
    details: [
      'Connect with wali or family guardian',
      'Family member can oversee conversations',
      'Transparent communication channels',
      'Respectful courtship process'
    ],
    color: 'border-blue-500 bg-blue-50'
  },
  {
    id: 3,
    icon: <FaEye className="text-purple-600" size={32} />,
    title: 'Secure Communication',
    description: 'Private messaging with Islamic communication guidelines',
    details: [
      'Control who sees your photos',
      'Location privacy settings',
      'Profile visibility controls',
      'Safe and modest interactions'
    ],
    color: 'border-purple-500 bg-purple-50'
  },
  {
    id: 4,
    icon: <FaHeart className="text-pink-600" size={32} />,
    title: 'Serious Intentions',
    description: 'Focus on marriage-minded connections only',
    details: [
      'Marriage-focused community',
      'Verified serious intentions',
      'No casual dating culture',
      'Long-term relationship goals'
    ],
    color: 'border-pink-500 bg-pink-50'
  },
  {
    id: 5,
    icon: <FaUsers className="text-orange-600" size={32} />,
    title: 'Family Participation',
    description: 'Encouraging family involvement in the process',
    details: [
      'Family can create profiles for members',
      'Parent and sibling involvement',
      'Cultural background matching',
      'Community-based approach'
    ],
    color: 'border-orange-500 bg-orange-50'
  },
  {
    id: 6,
    icon: <FaStar className="text-yellow-600" size={32} />,
    title: 'Muslim Values First',
    description: 'Built with Islamic principles and dignity',
    details: [
      'Prayer times integration',
      'Islamic calendar events',
      'Quranic compatibility questions',
      'Religious practice matching'
    ],
    color: 'border-yellow-500 bg-yellow-50'
  }
];

export default function IslamicFeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
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
              What makes FADDL MATCH different?
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            We understand the unique journey of those seeking a new chapter of happiness in marriage - 
            thoughtful connections for divorced and widowed Muslims in Singapore.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={`h-full border-2 ${feature.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                <CardHeader className="text-center pb-4">
                  <div className="w-full flex flex-col items-center">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardHeader>
                
                <CardBody className="pt-0">
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-500 mt-1">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Islamic Principles Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 text-center"
        >
          <FaMosque className="mx-auto mb-4 text-white" size={40} />
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            &quot;And among His signs is that He created for you mates from among yourselves, 
            that you may dwell in tranquility with them, and He has put love and mercy between your hearts. 
            Verily in that are signs for those who reflect.&quot;
          </h3>
          <p className="text-green-100 text-lg mb-2">
            — Quran 30:21
          </p>
          <p className="text-green-100 text-lg mb-6 italic">
            "The best of you are those who are best to their families..." —Al-Tirmidhi (3895)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="font-semibold mb-2">Halal Dating</h4>
              <p className="text-sm text-green-100">
                Islamic approach to finding a spouse with dignity and respect
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="font-semibold mb-2">Family Centered</h4>
              <p className="text-sm text-green-100">
                Involving families in the sacred journey of marriage
              </p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <h4 className="font-semibold mb-2">Marriage Focused</h4>
              <p className="text-sm text-green-100">
                Connecting hearts with the intention of building a family
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}