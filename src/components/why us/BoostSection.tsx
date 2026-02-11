import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------
// DATA: Matching the Screenshot's Categories & Vibes
// ----------------------------------------------------------------------
const categories = [
  {
    title: "Brand Identity",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop", // Woman/Green vibe
  },
  {
    title: "Lead Generation",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop", // Professional/Tablet
  },
  {
    title: "CRM Support",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop", // Business/Gold tones
  },
  {
    title: "Social Media",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop", // Red/Bold fashion
  },
  {
    title: "Website Design",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=400&auto=format&fit=crop", // Laptop/Clean
  },
  {
    title: "SEO Marketing",
    image:
      "https://images.unsplash.com/photo-1542204165-65926c4556a3?q=80&w=400&auto=format&fit=crop", // Red Abstract
  },
  {
    title: "Email Design",
    image:
      "https://images.unsplash.com/photo-1586075010923-2dd45eeed8bd?q=80&w=400&auto=format&fit=crop", // Papers/Documents
  },
  {
    title: "Creative Visuals",
    image:
      "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=400&auto=format&fit=crop", // Astronaut/Surreal (Matches screenshot)
  },
  {
    title: "3D Modeling",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop", // Abstract 3D
  },
  {
    title: "AI Strategy",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=400&auto=format&fit=crop", // Meeting/Top Down
  },
];

export default function BoostSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. INFINITE SLIDER ANIMATION
      // We move the track -50% because we doubled the content.
      // Ease: "none" ensures constant speed.
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          xPercent: -50,
          duration: 40, // Adjust speed (Higher = Slower)
          ease: "none",
          repeat: -1,
        });
      }

      // 2. TEXT REVEAL
      gsap.from(".boost-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full bg-accent py-16 overflow-hidden" // Using a very dark zinc/black
    >
      <div className="max-w-7xl mx-auto px-4 mb-16">
        {/* HEADER */}
        <div className="flex flex-col gap-6 max-w-3xl">
          <span className="boost-text text-xs font-bold tracking-widest text-[#FF713D] uppercase">
            Easy and Fast
          </span>
          <h2 className="boost-text text-4xl md:text-4xl font-bold text-white leading-tight tracking-tight">
            We Have Everything To Boost Your <br className="hidden md:block" />
            Business To Another Level.
          </h2>
        </div>
      </div>

      {/* -------------------------------------------
          INFINITE SLIDER TRACK
      -------------------------------------------- */}
      <div className="w-full relative">
        {/* w-max: Allows the container to stretch as wide as the images need.
            flex: Aligns them in a row.
            will-change-transform: Hints browser to optimize for movement.
        */}
        <div
          ref={trackRef}
          className="flex w-max gap-6 will-change-transform pl-4"
        >
          {/* TRIPLE THE ARRAY:
             We map it 3 times to ensure that on very wide screens (4k), 
             there are enough images to fill the width before the loop resets.
          */}
          {[...categories, ...categories, ...categories].map((item, i) => (
            <div
              key={i}
              className="relative w-[280px] h-[360px] md:w-[320px] md:h-[420px] flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* GRADIENT OVERLAY (Bottom to Top) - Makes text pop */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

              {/* TEXT CONTENT (Top Left) */}
              <div className="absolute top-0 left-0 p-6 w-full">
                <h3 className="text-white text-xl font-medium tracking-wide">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
