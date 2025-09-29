import FeaturesSection from "../../components/home/FeaturesSection";
import CaegoriesSection from "../../components/home/CaegoriesSection";
import HeroSection from "../../components/home/HeroSection";
import SessionGrid from "../../components/home/SessionGrid";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ENHANCED HERO SECTION */}
      <HeroSection />
      {/* ENHANCED CATEGORIES SECTION */}
      <CaegoriesSection />

      <div className="my-16">
        <SessionGrid />
      </div>

      {/* ENHANCED FEATURES SECTION */}
      <FeaturesSection />
    </div>
  );
}
