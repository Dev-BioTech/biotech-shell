import Navbar from "../../navigation/components/Navbar";
import Footer from "../../navigation/components/Footer";
import HeroSection from "../../landing/components/HeroSection";
import FeaturesSection from "../../landing/components/FeaturesSection";
import GallerySection from "../../landing/components/GallerySection";
import TestimonialsSection from "../../landing/components/TestimonialsSection";
import FAQSection from "../../landing/components/FAQSection";
import StatsSection from "../../landing/components/StatsSection";
import CTASection from "../../landing/components/CTASection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-hidden relative">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Gallery/Carousel Section */}
        <GallerySection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Stats Section */}
        <StatsSection />

        {/* CTA Section */}
        <CTASection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
