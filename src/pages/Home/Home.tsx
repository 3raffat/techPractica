import FeaturesSection from "../../components/home/FeaturesSection";
import CaegoriesSection from "../../components/home/CaegoriesSection";
import HeroSection from "../../components/home/HeroSection";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import { setToken } from "../../helpers/helpers";
export default function HomePage() {
  useEffect(() => {
    const cookies = new Cookies();
    const tokenFromCookie = cookies.get("access_token");

    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
  }, []);
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
