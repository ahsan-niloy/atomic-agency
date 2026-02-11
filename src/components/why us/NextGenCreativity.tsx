import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NextGenCreativity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      // 1. Text Animation (Staggered fade in from left)
      tl.from(".next-gen-text", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });

      // 2. Image Animation (Fade in from right)
      tl.from(
        imgRef.current,
        {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "<0.2", // Start 0.2s after text starts
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full bg-accent-2 py-24 md:py-32 px-4 overflow-hidden" // Warm beige background
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* LEFT COLUMN: TEXT CONTENT */}
        <div ref={textRef} className="w-full md:w-1/2 flex flex-col gap-8">
          {/* Eyebrow with Line */}
          <div className="next-gen-text flex items-center gap-4">
            <span className="text-xs font-bold tracking-widest text-primary uppercase whitespace-nowrap">
              Create Smarter, Faster
            </span>
            <div className="h-px bg-zinc-900 w-full max-w-[200px] opacity-20"></div>
          </div>

          {/* Heading */}
          <h2 className="next-gen-text text-4xl md:text-6xl font-medium text-zinc-900 leading-[1.1] tracking-tight">
            Next-gen creativity powered by <br className="hidden lg:block" />
            human expertise and AI
          </h2>

          {/* Paragraph */}
          <p className="next-gen-text text-lg text-zinc-600 leading-relaxed max-w-xl">
            Work with a world-class team blending creative vision and
            cuttingedge AI technology from designers, developers, and
            strategists to AI specialists and content creators all dedicated to
            elevating your brand with speed and precision. Plus, enjoy a
            dedicated project manager ensuring seamless delivery and brand
            consistency from start to finish.
          </p>

          {/* Button */}
          <div className="next-gen-text pt-4">
            <button className="bg-[#FF713D] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#E05E2E] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#FF713D]/20">
              Book a demo
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: IMAGE */}
        <div className="w-full md:w-1/2">
          <div
            ref={imgRef}
            className="relative rounded-3xl overflow-hidden shadow-2xl group aspect-[4/3]"
          >
            {/* Image Source matching the "Tablet Design" vibe */}
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
              alt="Designer working on tablet with AI tools"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Optional: Subtle sheen effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
