import HeroSection from "@/sections/HeroSection";
import NewArrivalsSection from "@/sections/NewArrivalsSection";
import TrendingSection from "@/sections/TrendingSection";
import BestSellersSection from "@/sections/BestSellersSection";
import WhyUsSection from "@/sections/WhyUsSection";
import NewsletterSection from "@/sections/NewsletterSection";
import SEO from "@/components/SEO";
export default function HomePage() {
  return (
    <>
      <SEO 
        title="Vintage Rush | Premium Streetwear Clothing" 
        description="Discover premium streetwear and fashion inspired by the latest trends. Shop Vintage Rush for oversized tees, hoodies, cargos, and more."
      />
      <HeroSection />
      <NewArrivalsSection />
      <TrendingSection />
      <BestSellersSection />
      <WhyUsSection />
      <NewsletterSection />
    </>
  );
}
