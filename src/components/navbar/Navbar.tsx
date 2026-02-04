import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../ui/Button";
import AtomicLogo from "../../assets/AtomicLogo.svg?url";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const navBgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const desktopLinksRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | HTMLDivElement)[]>([]);

  const tl = useRef<gsap.core.Timeline>(null);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Our work", href: "#work" },
    { name: "Why us", href: "#why-us" },
    { name: "Pricing", href: "#pricing" },
  ];

  useGSAP(
    () => {
      // 1. SETUP
      // We tell GSAP: "Even though it's invisible in CSS, start handling it."
      gsap.set(menuRef.current, { yPercent: -100, autoAlpha: 1 });

      // 2. DESKTOP ANIMATION
      const desktopItems = desktopLinksRef.current?.children;
      if (desktopItems) {
        gsap.from(desktopItems, {
          y: -20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.2,
        });
      }

      // 3. MASTER TIMELINE
      tl.current = gsap.timeline({ paused: true });

      // STEP A: Hide Navbar Elements
      tl.current.to([navBgRef.current, logoRef.current, ctaRef.current], {
        autoAlpha: 0,
        y: -10,
        duration: 0.4,
        ease: "power2.in",
      });

      // STEP B: Drop Curtain
      tl.current.to(
        menuRef.current,
        {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.inOut",
        },
        "-=0.2",
      );

      // STEP C: Animate Links
      tl.current.from(
        mobileLinksRef.current,
        {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      );
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (tl.current) {
      if (isOpen) {
        tl.current.play();
        document.body.style.overflow = "hidden";
      } else {
        tl.current.reverse();
        document.body.style.overflow = "";
      }
    }
  }, [isOpen]);

  const addToMobileRefs = (el: HTMLAnchorElement | HTMLDivElement | null) => {
    if (el && !mobileLinksRef.current.includes(el)) {
      mobileLinksRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      {/* NAVBAR CONTAINER */}
      <div className="relative w-full max-w-6xl">
        {/* 1. GLASS BACKGROUND */}
        <div
          ref={navBgRef}
          className="absolute inset-0 rounded-2xl border border-white/40 bg-white/60 shadow-xl backdrop-blur-xl"
        />

        {/* 2. NAVBAR CONTENT */}
        <div className="relative z-[60] flex h-16 items-center justify-between px-4">
          <a ref={logoRef} href="/" className="shrink-0 block">
            <img src={AtomicLogo} alt="Atomic" className="h-8 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8 absolute left-0 right-0 justify-center pointer-events-none">
            <div
              ref={desktopLinksRef}
              className="flex gap-8 pointer-events-auto"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-zinc-800 hover:text-[#FF713D] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div ref={ctaRef} className="flex items-center gap-3">
              <div className="hidden md:block">
                <Button variant="outline" className="!py-2 !px-4 text-sm">
                  Contact
                </Button>
              </div>
              <Button
                variant="primary"
                className="!py-2 !px-4 text-xs md:text-sm"
              >
                Book a Demo
              </Button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden ml-1 flex h-10 w-10 items-center justify-center rounded-full cursor-pointer transition-colors relative 
                ${isOpen ? "bg-white/20 text-white hover:bg-white/30" : "bg-white/50 text-black hover:bg-white"}`}
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* FULL SCREEN MENU */}
      <div
        ref={menuRef}
        // ADDED 'invisible' HERE to prevent the flash
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#FF713D] h-screen w-screen invisible"
      >
        <div className="flex flex-col items-center gap-8 text-center p-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              ref={addToMobileRefs}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-bold text-white hover:text-white/80 transition-colors"
            >
              {link.name}
            </a>
          ))}

          <div ref={addToMobileRefs} onClick={() => setIsOpen(false)}>
            <button className="mt-4 px-8 py-3 rounded-xl bg-white text-[#FF713D] font-bold text-lg shadow-lg active:scale-95 transition-transform">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
