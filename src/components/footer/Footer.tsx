import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AtomicLogo from "../../assets/AtomicLogo.svg?url";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Footer Content Fade In
      gsap.from(".footer-content", {
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

      // 2. MASSIVE LOGO REVEAL (Parallax from bottom)
      // Starts hidden below (y: 100%), rises to y: 40% (Half visible)
      gsap.fromTo(
        logoRef.current,
        { y: "100%" },
        {
          y: "40%", // Adjust this value to show more/less of the logo
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", // When footer top hits viewport bottom
            end: "bottom bottom", // When footer bottom hits viewport bottom
            scrub: 1, // Smoothly link to scroll
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <footer
      ref={containerRef}
      className="relative w-full bg-[#130803] pt-24 pb-0 overflow-hidden" // Dark Brown/Black Theme
    >
      <div className="max-w-7xl mx-auto px-4 relative z-20 mb-32">
        {" "}
        {/* mb-32 to give space before logo */}
        {/* TOP SECTION: NEWSLETTER & CTA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-20 border-b border-white/10 pb-20 footer-content">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
              Ready to scale? <br />
              <span className="text-[#FF713D]">Let's build.</span>
            </h2>
            <p className="text-white/60 text-lg">
              Join our newsletter for the latest AI trends, growth hacks, and
              agency insights.
            </p>
          </div>

          {/* NEWSLETTER FORM */}
          <div className="w-full md:w-auto min-w-[300px]">
            <form className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-b border-white/30 py-4 text-white text-lg placeholder:text-white/30 focus:outline-none focus:border-[#FF713D] transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#FF713D] font-bold uppercase tracking-wider text-sm hover:text-white transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* MIDDLE SECTION: LINKS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 footer-content">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">
              Company
            </h4>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              Careers
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              Partners
            </a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">
              Services
            </h4>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              Web Development
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              AI Automation
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              SEO & Ads
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              Content Creation
            </a>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">
              Legal
            </h4>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              Cookie Policy
            </a>
          </div>

          {/* Column 4: Socials */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2">
              Socials
            </h4>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              Twitter / X
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-[#FF713D] transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
        {/* COPYRIGHT */}
        <div className="mt-20 pt-8 flex justify-between items-center text-xs text-white/20 footer-content">
          <span>© 2026 Atomic Agency. All rights reserved.</span>
          <span>Made in Canada.</span>
        </div>
      </div>

      {/* -------------------------------------------
          THE BIG LOGO (Parallax Background)
          - pointer-events-none: So it doesn't block clicks
          - select-none: Can't highlight it
      -------------------------------------------- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none z-10 opacity-10">
        <div ref={logoRef} className="w-full text-center leading-none">
          {/* We use a massive SVG Text to ensure sharpness at any size. 
             "w-full" stretches it.
          */}
          <img src={AtomicLogo} alt="atomic logo" className="w-full" />
        </div>
      </div>
    </footer>
  );
}
