import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------
// DATA
// ----------------------------------------------------------------------
const features = [
  {
    id: 1,
    title: "Top-tier creative talent",
    description:
      "Access designers, developers, and marketers with a passion for turning bold ideas into reality.",
    color: "bg-[#FF9900]",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Lightning-fast delivery",
    description:
      "We keep projects moving so your business stays ahead — without compromising quality.",
    color: "bg-[#990033]",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Flexible collaboration model",
    description:
      "Choose the services you need, when you need them, for ultimate control and cost-efficiency.",
    color: "bg-[#000099]",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
  },
];

export default function WhyUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. HEADLINE ANIMATION
      gsap.from(".why-us-header", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // 2. CARDS ANIMATION
      gsap.from(".why-us-card", {
        y: -100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".why-us-grid",
          start: "top 75%",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="why-us"
      className="w-full bg-[#F5F2EB] py-32 px-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* HEADER SECTION */}
        <div className="why-us-header flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
            Made to Create
          </span>
          <h2 className="text-4xl md:text-5xl font-medium text-zinc-900 leading-tight">
            Super skilled. Super agile. Super dedicated. Work with a creative
            team that’s driven to help your business stand out and grow faster.
          </h2>
        </div>

        {/* CARDS GRID */}
        <div className="why-us-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="why-us-card group relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-xl cursor-pointer"
            >
              {/* IMAGE LAYER */}
              <div className="absolute inset-0 z-0">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
              </div>

              {/* SLIDING CONTENT PANEL */}
              <div
                className={`
                  absolute bottom-0 left-0 right-0 z-20 w-full 
                  px-8 py-8
                  transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) 
                  ${feature.color}
                  
                  translate-y-[calc(100%-6rem)] 
                  group-hover:translate-y-0
                  group-active:translate-y-0
                  group-focus:translate-y-0
                `}
              >
                <div className="flex flex-col gap-6 items-center text-center">
                  {/* TITLE & MOBILE ICON CONTAINER */}
                  {/* UPDATED: flex-row, gap-2 (Side by side) */}
                  <div className="flex flex-row items-center justify-center gap-2 min-h-[2rem]">
                    <h3 className="text-white font-bold text-xl">
                      {feature.title}
                    </h3>

                    {/* MOBILE-ONLY UP ARROW */}
                    <div className="md:hidden transition-opacity duration-300 group-hover:opacity-0 group-active:opacity-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-5 h-5 text-white/80"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100 group-active:opacity-100">
                    <p className="text-white/90 text-lg font-medium leading-relaxed pb-4">
                      {feature.description}
                    </p>

                    <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center mx-auto mt-2">
                      <svg
                        className="w-4 h-4 text-white rotate-90"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
