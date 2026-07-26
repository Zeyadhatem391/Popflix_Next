import HeroBackground from "../hero/HeroBackground";
import HeroContent from "../hero/HeroContent";
import HeroOverlay from "../hero/HeroOverlay";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
     
      <HeroBackground />

    
      <HeroOverlay />

    
      <HeroContent />
    </section>
  );
}