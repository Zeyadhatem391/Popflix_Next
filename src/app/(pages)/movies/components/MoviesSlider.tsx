"use client";

import { useEffect, useRef } from "react";

export default function MoviesSlider({
  children,
}: {
  children: React.ReactNode;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let pos = 0;
    const speed = 0.5;

    const animate = () => {
      pos -= speed;

      // الحركة الدائرية الحقيقية
      if (Math.abs(pos) >= slider.scrollWidth / 2) {
        pos += slider.scrollWidth / 2;
      }

      slider.style.transform = `translateX(${pos}px)`;

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div
        ref={sliderRef}
        className="flex gap-2.5 w-max"
        style={{ willChange: "transform" }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}