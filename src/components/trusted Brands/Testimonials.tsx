import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ----------------------------------------------------------------------
// LOGO IMPORTS
// ----------------------------------------------------------------------
import knokLogo from "../../assets/Knok.png?url";
import luxeLogo from "../../assets/LuxeStudios.png?url";
import doubleGLogo from "../../assets/DoubleG.png?url";
import blushworkLogo from "../../assets/Blushwork.png?url";
import siteGuardianLogo from "../../assets/SiteGuardian.png?url";

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------
// DATA
// ----------------------------------------------------------------------
const testimonials = [
  {
    id: 1,
    company: "Knok",
    logo: knokLogo,
    isTextLogo: false,
    text: "The app architecture they built is incredibly robust. We've seen a 40% increase in daily active users since the update, and the crash-free rate is sitting at 99.9%. It just works.",
    person: {
      name: "Sarah Jenkins",
      role: "Product Lead",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
  },
  {
    id: 2,
    company: "Luxe Studios",
    logo: luxeLogo,
    isTextLogo: false,
    text: "I was skeptical about AI automation at first, but the agents Atomic set up for our scheduling are magic. Our booking process used to take hours of manual admin; now it runs itself 24/7.",
    person: {
      name: "Marcus Thorne",
      role: "Founder",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    },
  },
  {
    id: 3,
    company: "Bengal Wash",
    logo: "Bengal Wash", // Keeps text for this one
    isTextLogo: true,
    text: "We needed a complete ecosystem—a booking site, a driver app, and the marketing to launch it. Atomic handled all three seamlessly. The sync between the web dashboard and the mobile app is flawless.",
    person: {
      name: "Tariq Al-Fayed",
      role: "Operations Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
  },
  {
    id: 4,
    company: "Double G",
    logo: doubleGLogo,
    isTextLogo: false,
    text: "They didn't just build a website; they built a sales engine. The lead qualification flow they designed has doubled our conversion rate on cold traffic. Truly top-tier work.",
    person: {
      name: "Emily Chen",
      role: "Head of Growth",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    },
  },
  {
    id: 5,
    company: "SiteGuardian",
    logo: siteGuardianLogo,
    isTextLogo: false,
    text: "Peace of mind. That's what I paid for. Knowing our security patches are automated and our uptime is monitored gives me the freedom to focus on expanding the business.",
    person: {
      name: "David Ross",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
  },
  {
    id: 6,
    company: "Blushwork",
    logo: blushworkLogo,
    isTextLogo: false,
    text: "Breaking into the US market is tough, but their data-driven ad strategy gave us the traction we needed immediately. The creative assets were spot on for the demographic.",
    person: {
      name: "Jessica Lee",
      role: "Marketing VP",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
  },
];

// Helper Hook for Mobile detection
const useIsMobile = () => {
  // Initialize state based on current window width (if browser)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width to state (md breakpoint is usually 768px)
      setIsMobile(window.innerWidth < 768);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return isMobile;
};

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Determine visible testimonials based on device
  const visibleTestimonials = isMobile
    ? testimonials.slice(0, 4) // Only first 4 on mobile
    : testimonials; // All on desktop

  useGSAP(
    () => {
      // Kill previous animations if the number of items changes to avoid conflicts
      gsap.killTweensOf(".testimonial-card");

      gsap.from(".testimonial-card", {
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
    // Re-run GSAP if mobile state changes (items added/removed)
    { scope: containerRef, dependencies: [isMobile] },
  );

  return (
    <section ref={containerRef} className="w-full bg-accent py-32 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold tracking-widest text-[#FF713D] uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Trusted by ambitious brands.
          </h2>
          <p className="text-white/80 text-lg">
            Don't just take our word for it. Here's what our partners have to
            say about working with Atomic.
          </p>
        </div>

        {/* MASONRY GRID */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {visibleTestimonials.map((item) => (
            <div
              key={item.id}
              // UPDATED STYLES: Frosted Glass Effect
              // bg-white/5 + backdrop-blur-lg creates the effect.
              // border-white/10 makes the border subtle.
              className="testimonial-card break-inside-avoid bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/10 flex flex-col justify-between"
            >
              <div>
                {/* QUOTE ICON */}
                <div className="mb-6">
                  <svg
                    // Slightly brighter icon color for dark bg
                    className="w-8 h-8 text-[#FF713D]/50"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                  </svg>
                </div>

                {/* TEXT - Updated to white/light text */}
                <p className="text-white/90 text-lg leading-relaxed mb-8">
                  "{item.text}"
                </p>
              </div>

              <div>
                {/* DIVIDER - Lighter divider */}
                <div className="w-full h-px bg-white/20 mb-6" />

                {/* FOOTER: PERSON + LOGO */}
                <div className="flex items-center justify-between">
                  {/* LEFT: Person Info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={item.person.image}
                      alt={item.person.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                    <div className="flex flex-col">
                      {/* Lighter names and roles */}
                      <span className="text-sm font-bold text-white leading-none">
                        {item.person.name}
                      </span>
                      <span className="text-xs text-white/60 mt-1">
                        {item.person.role}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT: Company Logo (Image or Text) */}
                  <div className="flex items-center justify-end">
                    {item.isTextLogo ? (
                      // BENGAL WASH TEXT LOGO
                      <span className="font-serif font-bold text-white uppercase tracking-wider text-sm">
                        {item.logo as string}
                      </span>
                    ) : (
                      // IMPORTED IMAGE LOGO
                      // Removed grayscale/opacity so white logos pop
                      <img
                        src={item.logo as string}
                        alt={`${item.company} logo`}
                        className="h-6 md:h-8 w-auto object-contain hover:scale-105 transition-transform duration-300"
                      />
                    )}
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
