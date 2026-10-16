import HeroContentVideo from "./HeroContentVideo";
import HeroSoundButton from "./HeroSoundButton";

export default function HeroVideo() {
  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="hero-background-video absolute inset-0 h-full w-full object-cover"
      >
        <source src="https://res.cloudinary.com/hnmpedxc/video/upload/q_auto,f_auto,w_1920/hero_video" />
      </video>

      <div className="absolute inset-0 bg-black/25" />

      <HeroContentVideo />

      <HeroSoundButton />
    </section>
  );
}
