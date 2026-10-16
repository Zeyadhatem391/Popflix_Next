"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function HeroSoundButton() {
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    const video = document.querySelector<HTMLVideoElement>(
      ".hero-background-video",
    );

    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <button
      onClick={toggleSound}
      aria-label={isMuted ? "Unmute video" : "Mute video"}
      className="absolute bottom-8 right-8 z-20 rounded-full border border-white/30 bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-white/20"
    >
      {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
    </button>
  );
}