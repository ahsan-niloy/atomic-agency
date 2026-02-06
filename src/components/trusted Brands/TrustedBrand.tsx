import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Import your logos based on the filenames provided
import Adobe from "../../assets/Adobe.png?url";
import Blushwork from "../../assets/Blushwork.png?url";
import DoubleG from "../../assets/DoubleG.png?url";
import Figma from "../../assets/Figma.png?url";
import Fiverr from "../../assets/fiverr.png?url";
import Group19 from "../../assets/Group 19.png?url";
import Knok from "../../assets/Knok.png?url";
import Legacy from "../../assets/Legacy.png?url";
import LuxeStudios from "../../assets/LuxeStudios.png?url";

// Single array source
const logos = [
  Adobe,
  Blushwork,
  DoubleG,
  Figma,
  Fiverr,
  Group19,
  Knok,
  Legacy,
  LuxeStudios,
];

export default function TrustedBrands() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // --------------------------------------------------------
      // ROW 1: Slides LEFT (Standard Marquee)
      // --------------------------------------------------------
      // We move from 0% to -50% (because the content is doubled)
      if (row1Ref.current) {
        gsap.to(row1Ref.current, {
          xPercent: -50,
          duration: 35,
          ease: "none",
          repeat: -1,
        });
      }

      // --------------------------------------------------------
      // ROW 2: Slides RIGHT (Opposite Direction)
      // --------------------------------------------------------
      // We start at -50% and move to 0%
      if (row2Ref.current) {
        gsap.fromTo(
          row2Ref.current,
          { xPercent: -50 },
          {
            xPercent: 0,
            duration: 30,
            ease: "none",
            repeat: -1,
          },
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="w-full bg-accent py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h2 className="text-3xl md:text-2xl font-bold text-white tracking-tight">
          Trusted by more than{" "}
          <span className="text-[#FF713D]">100+ brands</span>
        </h2>
      </div>

      {/* MASK-IMAGE MAGIC:
        This creates the fade effect on both sides. 
        It says: "Visible (opaque) in the middle, transparent at the edges."
      */}
      <div
        className="relative flex flex-col gap-16"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {/* ROW 1: Sliding Left */}
        {/* w-max ensures the container is as wide as its content */}
        <div ref={row1Ref} className="flex gap-26 w-max items-center">
          {/* We triple the list to ensure there's absolutely no visual gap on huge screens */}
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <img
              key={`r1-${i}`}
              src={logo}
              alt="Brand Logo"
              className="h-10 md:h-12 w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
