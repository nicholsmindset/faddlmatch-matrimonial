'use client';

import { useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqData = [
  {
    question: "What is Faddl?",
    answer: "Faddl is a faith-guided platform built especially for widowed and divorced Muslims seeking a second chance at companionship. We prioritise dignity, privacy, and genuine connection — no swiping, no pressure."
  },
  {
    question: "Who is Faddl for?",
    answer: "Faddl is for Muslim men and women who are previously married, and who are looking to begin again with someone who shares their values and understands their journey."
  },
  {
    question: "What makes Faddl different from other matchmaking sites?",
    answer: "Faddl's uniqueness lies in:\n\n• A focused niche: We serve only widowed and divorced Muslims — no generic profiles or unclear intentions.\n\n• Blurred profile photos until mutual interest or admin approval — for privacy and modesty.\n\n• No swiping or superficial browsing — we prioritise sincerity over speed.\n\n• A gentle personality and values-based matching feature to increase compatibility and reduce mismatches.\n\n• Designed with cultural sensitivity and adab in mind, especially for users in Singapore and Southeast Asia."
  },
  {
    question: "Is Faddl Shariah-compliant?",
    answer: "Faddl is designed to honour Islamic principles; profiles are moderated for appropriate content, and users are encouraged to involve a wali or guardian. We promote intention-led, halal connections — not dating."
  },
  {
    question: "How do I know the people here are genuine?",
    answer: "We use a manual profile review process, optional ID verification, and flagging/report tools to ensure genuine intent and safety. This platform was built to protect hearts, not play with them."
  },
  {
    question: "Is there a fee to join?",
    answer: "Faddl will always have a free basic tier, with optional upgrades for extra features. We believe finding a second chance at happiness shouldn't be out of reach due to finances."
  },
  {
    question: "Can I use Faddl from outside Singapore?",
    answer: "Yes. While Faddl is built with Singapore's Muslim community in mind, we welcome users from across Southeast Asia and beyond who align with our values."
  },
  {
    question: "Is my data safe and private?",
    answer: "Absolutely. We take privacy seriously — your photos remain blurred by default, your contact info is never shared publicly, and you're always in control of who sees your profile."
  },
  {
    question: "How do I get started?",
    answer: "Just sign up with your email or Google account, complete your profile with honesty and care, and let Faddl guide you toward someone compatible, sincere, and ready — just like you."
  }
];

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FaqItem({ question, answer, isOpen, onToggle }: FaqItemProps) {
  return (
    <Card className="mb-4 shadow-md hover:shadow-lg transition-all duration-300">
      <CardBody className="p-0">
        <Button
          onClick={onToggle}
          className="w-full justify-between p-6 bg-transparent hover:bg-amber-50 transition-colors duration-200"
          endContent={
            <ChevronDownIcon 
              className={`w-5 h-5 text-amber-600 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`} 
            />
          }
        >
          <span className="text-lg font-semibold text-gray-800 text-left flex-1">
            ❓ {question}
          </span>
        </Button>
        
        {isOpen && (
          <div className="px-6 pb-6 animate-in slide-in-from-top-1 duration-200">
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {answer}
              </p>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export default function FaqSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const toggleAll = () => {
    if (openItems.size === faqData.length) {
      setOpenItems(new Set());
    } else {
      setOpenItems(new Set(Array.from({ length: faqData.length }, (_, i) => i)));
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-amber-50 to-white py-20">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 text-transparent bg-clip-text">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Everything you need to know about FADDLmatch
          </p>
          <Button
            onClick={toggleAll}
            className="mb-8 bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-300"
            variant="flat"
          >
            {openItems.size === faqData.length ? 'Collapse All' : 'Expand All'}
          </Button>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItems.has(index)}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              We're here to help you on your journey to finding meaningful connection.
            </p>
            <Button
              className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white px-8 py-3 rounded-full hover:opacity-90 transition-all shadow-lg"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}