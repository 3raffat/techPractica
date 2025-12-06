import FeaturesSection from "../../components/home/FeaturesSection";
import CaegoriesSection from "../../components/home/CaegoriesSection";
import HeroSection from "../../components/home/HeroSection";
export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ENHANCED HERO SECTION */}
      <HeroSection />
      {/* ENHANCED CATEGORIES SECTION */}
      <CaegoriesSection />

      {/* ENHANCED FEATURES SECTION */}
      <FeaturesSection />
    </div>
  );
}
