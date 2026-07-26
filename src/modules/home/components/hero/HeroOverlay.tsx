export default function HeroOverlay() {
  return (
    <>
      {/* Main dark overlay */}
      <div className="absolute inset-0 z-20 bg-black/40" />

      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 z-30 h-32 bg-linear-to-b from-black/80 to-transparent" />

      {/* Bottom gradient */}
      <div className="absolute right-0 bottom-0 left-0 z-30 h-32 bg-linear-to-t from-black/80 to-transparent" />
    </>
  );
}