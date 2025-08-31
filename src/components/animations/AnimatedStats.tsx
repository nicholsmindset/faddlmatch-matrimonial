"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "100K+", label: "Active Singles" },
  { value: "50K+", label: "Success Stories" },
  { value: "4.8★", label: "App Store Rating" },
  { value: "95%", label: "Match Success Rate" },
];

export default function AnimatedStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.2 + 0.5,
          }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: index * 0.2 + 0.5,
            }}
            className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text"
          >
            {stat.value}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.2 + 0.8,
            }}
            className="text-gray-600"
          >
            {stat.label}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
