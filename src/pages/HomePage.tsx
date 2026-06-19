import SEO from "@/components/SEO";
import HeroSection from "@/sections/HeroSection";
import NewArrivalsSection from "@/sections/NewArrivalsSection";
import CollectionsSection from "@/sections/CollectionsSection";
import BestSellersSection from "@/sections/BestSellersSection";
import BrandStorySection from "@/sections/BrandStorySection";
import WhyUsSection from "@/sections/WhyUsSection";
import InstagramGallerySection from "@/sections/InstagramGallerySection";
import NewsletterSection from "@/sections/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <SEO 
        title="Vintage Rush | Premium Indian Streetwear" 
        description="Discover premium Indian streetwear born in Surat. Shop Vintage Rush for oversized tees, cargos, hoodies and more. Wear the Trend. Own the Rush."
      />
      <HeroSection />
      <NewArrivalsSection />
      <CollectionsSection />
      <BestSellersSection />
      <BrandStorySection />
      <WhyUsSection />
      <InstagramGallerySection />
      <NewsletterSection />
    </>
  );
}
