import { auth } from "@/auth";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import PricingPackages from "@/components/PricingPackages";
import TestimonialsSection from "@/components/TestimonialsSection";
import CallToActionSection from "@/components/CallToActionSection";
import IslamicFeaturesSection from "@/components/IslamicFeaturesSection";
import IslamicPricingPackages from "@/components/IslamicPricingPackages";
import IslamicTestimonialsSection from "@/components/IslamicTestimonialsSection";
import FaqSection from "@/components/FaqSection";

const DynamicHeartAnimation = dynamic(
  () =>
    import(
      "@/components/animations/HeartAnimation"
    ),
  { ssr: false }
);
const DynamicAnimatedBackground = dynamic(
  () =>
    import(
      "@/components/animations/AnimatedBackground"
    ),
  { ssr: false }
);
const DynamicAnimatedStats = dynamic(
  () =>
    import(
      "@/components/animations/AnimatedStats"
    ),
  { ssr: false }
);
const DynamicAnimatedFeatures = dynamic(
  () =>
    import(
      "@/components/animations/AnimatedFeatures"
    ),
  { ssr: false }
);

export default async function Home() {
  const session = await auth();

  return (
    // This negative margin trick overrides the container mx-auto from layout.tsx
    <div className="-mx-[calc(50vw-50%)] w-screen -mt-[calc(1.25rem)]">
      {/* Hero Section */}
      <div className="w-full min-h-screen relative overflow-hidden bg-gradient-to-b from-amber-100 via-yellow-50 to-white">
        <DynamicAnimatedBackground />
        <DynamicHeartAnimation />

        <div className="w-full max-w-7xl mx-auto px-4 py-20 flex flex-col justify-center items-center min-h-screen">
          <div className="text-center space-y-8 w-full max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="inline-block bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 text-transparent bg-clip-text transform hover:scale-105 transition-transform cursor-default">
                FADDLmatch
              </span>
            </h1>
            <p className="text-lg text-amber-700 font-medium italic -mt-4 mb-4">
              a fresh start
            </p>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light mt-8">
              A respectful, Islamic matrimonial platform designed for divorced and widowed Muslims in Singapore 
              seeking meaningful remarriage with family involvement and Islamic values at the center.
            </p>

            <div className="flex flex-col items-center gap-8 mt-12">
              {session ? (
                <Button
                  as={Link}
                  href="/members"
                  className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white text-xl px-12 py-8 rounded-full hover:opacity-90 transform hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
                >
                  Continue Your Journey
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    as={Link}
                    href="/register"
                    className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white text-xl px-12 py-8 rounded-full hover:opacity-90 transform hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
                  >
                    Find Happiness Again
                  </Button>
                  <Button
                    as={Link}
                    href="/login"
                    className="bg-white text-amber-700 border-2 border-amber-500 text-xl px-12 py-8 rounded-full hover:bg-amber-50 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>

            <DynamicAnimatedStats />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-white relative overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 py-20">
          <div className="text-center w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 text-transparent bg-clip-text w-full">
              Why Choose FADDLmatch?
            </h2>
            <DynamicAnimatedFeatures />
          </div>
        </div>
      </div>

      {/* Islamic Features Section */}
      <IslamicFeaturesSection />

      {/* Islamic Pricing Packages Section */}
      <IslamicPricingPackages />

      {/* Islamic Testimonials Section */}
      <IslamicTestimonialsSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Call to Action Section */}
      <CallToActionSection />
    </div>
  );
}
