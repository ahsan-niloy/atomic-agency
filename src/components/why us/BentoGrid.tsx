import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BentoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Stagger animate cards in
      gsap.from(".bento-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="w-full bg-accent py-32 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* HEADER */}
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-medium text-white leading-tight">
            Integrating digital solution to fill the gaps for driving growth
          </h2>
        </div>

        {/* -------------------------------------------
            BENTO GRID LAYOUT
            Desktop: 4 Columns
            Mobile: 1 Column
            
            Logic:
            Row 1: [Orange (2)] [Shopify (1)] [Tall (1)]
            Row 2: [Connect (1)] [Water (2)]  [Tall (cont)]
        -------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[350px]">
          {/* 1. ORANGE CARD (Span 2) */}
          <div className="bento-card md:col-span-2 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FF8F5B] to-[#FF5E1E] p-8 flex flex-col justify-between group">
            <div className="z-10 text-white">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="font-medium text-sm md:text-base">
                  Fill your schedule
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-medium leading-tight">
                with opportunities.
              </h3>
            </div>

            {/* MOCKUP UI */}
            <div className="absolute bottom-0 right-0 w-[85%] h-[60%] bg-white rounded-tl-2xl shadow-2xl p-4 flex flex-col gap-3 translate-y-8 translate-x-8 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4">
              {/* Mock Header */}
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                <div className="h-2 w-24 bg-gray-100 rounded-full"></div>
              </div>
              {/* Mock Calendar Grid */}
              <div className="grid grid-cols-7 gap-2 h-full">
                {[...Array(14)].map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-md ${i === 4 || i === 10 ? "bg-blue-50 border border-blue-100" : "bg-gray-50"}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. SHOPIFY/STORE CARD (Span 1) */}
          <div className="bento-card md:col-span-1 relative rounded-3xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=800&auto=format&fit=crop"
              alt="Shopify Store Owner"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
              <div className="w-10 h-10 bg-[#95BF47] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                S
              </div>
              <h3 className="text-white text-2xl font-medium leading-tight">
                We built, grow, market your store.
              </h3>
            </div>
          </div>

          {/* 3. TALL AI CARD (Span 1, Row Span 2) */}
          <div className="bento-card md:col-span-1 md:row-span-2 relative rounded-3xl overflow-hidden group min-h-[500px] md:min-h-auto">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
              alt="Surreal AI Art"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Red Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-red-900/40 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-start gap-4">
              <div className="p-2 bg-white/20 w-fit rounded-lg backdrop-blur-sm">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-medium leading-tight mt-4">
                AI-Powered Content, Studio-Free Savings
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Harness the power of AI to create stunning visuals and content
                that stay true to your brand — no costly studio photoshoots
                required.
              </p>
            </div>
          </div>

          {/* 4. CONNECT CARD (Span 1) */}
          <div className="bento-card md:col-span-1 relative rounded-3xl overflow-hidden bg-[#1A1A1A] border border-white/5 group">
            {/* Retro Computer BG Image */}
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
              alt="Retro Computer"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end gap-3">
              <div className="flex items-center gap-2 text-white/60 mb-auto">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <h3 className="text-white text-xl font-medium leading-tight">
                Connect seamlessly with your tools
              </h3>
              <p className="text-white/60 text-xs leading-relaxed">
                Already using Slack, Trello, or Asana? We integrate perfectly to
                keep your workflows smooth.
              </p>
            </div>
          </div>

          {/* 5. WATER/SUCCESS CARD (Span 2) */}
          <div className="bento-card md:col-span-2 relative rounded-3xl overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop"
              alt="Success Stories Water"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/10 transition-colors" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="text-white text-2xl font-medium leading-tight mb-2">
                Be inspired by real success stories
              </h3>
              <p className="text-white/80 text-sm max-w-md">
                Explore how Atomic Agency helped brands like yours shine online
                — and spark ideas for your next big project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
