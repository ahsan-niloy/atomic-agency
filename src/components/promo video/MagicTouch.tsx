import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MagicTouch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  useGSAP(
    () => {
      // Create a MatchMedia instance for responsive animations
      const mm = gsap.matchMedia();

      // Define contexts: Desktop vs Mobile
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          // Get conditions (safely access bools)
          const { isMobile } = context.conditions as { isMobile: boolean };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 90%",
              scrub: 1.5,
            },
          });

          // 1. TEXT ANIMATION
          tl.to(textRef.current, {
            rotateX: 35,
            scale: 0.85,
            y: 10,
            opacity: 0.8,
            transformOrigin: "center bottom",
            ease: "power2.out",
            duration: 1,
          });

          // 2. VIDEO ANIMATION (Responsive)
          tl.fromTo(
            videoRef.current,
            {
              // Mobile starts wider (85%) so it doesn't look like a tiny postage stamp
              width: isMobile ? "85%" : "50%",
              y: 100,
              opacity: 0,
              boxShadow: "0px 0px 0px rgba(0,0,0,0)",
            },
            {
              width: "90%",
              // THE FIX: -20 on Mobile (Subtle), -100 on Desktop (Dramatic)
              y: isMobile ? -45 : -100,
              opacity: 1,
              boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
              duration: 1.2,
              ease: "power2.out",
            },
            "<", // Sync with text
          );
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-max md:min-h-[120vh] min-h-[100vh] bg-accent flex flex-col items-center justify-start pt-32 overflow-hidden perspective-1000"
      style={{ perspective: "1000px" }}
    >
      {/* -------------------------------------------
          HEADLINE TEXT
      -------------------------------------------- */}
      <div className="z-0 px-4 text-center">
        <h2
          ref={textRef}
          className="text-6xl md:text-9xl whitespace-nowrap font-bold tracking-tighter text-white origin-bottom will-change-transform"
        >
          Touch of our
          <span className="text-[#FF713D]"> Magic.</span>
        </h2>
      </div>

      {/* -------------------------------------------
          VIDEO FRAME
      -------------------------------------------- */}
      <div
        ref={videoRef}
        className="relative z-10 mt-12 aspect-video rounded-3xl overflow-hidden bg-black mx-auto cursor-pointer group"
        onClick={() => setIsPlaying(true)}
      >
        {!isPlaying ? (
          <>
            <img
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop"
              alt="Magic Video Cover"
              className="w-full h-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-60"
            />

            {/* PLAY BUTTON */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF713D]">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium tracking-widest uppercase">
              Watch Showreel
            </span>
          </>
        ) : (
          <video
            className="w-full h-full object-cover"
            autoPlay
            controls
            src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_25fps.mp4"
          />
        )}
      </div>
    </section>
  );
}
