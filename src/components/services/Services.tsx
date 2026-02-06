import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------
// DATA
// ----------------------------------------------------------------------
const services = [
  {
    id: "01",
    title: "Content Creation",
    description:
      "Compelling visual and written narratives that capture attention.",
    categories: [
      { name: "Video", items: ["Short-form", "Motion Graphics"] },
      { name: "Written", items: ["Scriptwriting", "Copywriting"] },
      { name: "Strategy", items: ["Content Calendar", "Brand Voice"] },
    ],
    images: [
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
    ],
  },
  {
    id: "02",
    title: "Web Development",
    description: "High-performance websites built for speed and conversion.",
    categories: [
      { name: "Build", items: ["Wordpress", "Shopify"] },
      { name: "Optimize", items: ["SEO Technical", "Accessibility"] },
      { name: "Maintain", items: ["Security", "Analytics"] },
    ],
    images: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80",
    ],
  },
  {
    id: "03",
    title: "Social & Google Ads",
    description:
      "Data-driven campaigns that put your brand in front of the right people.",
    categories: [
      { name: "Paid", items: ["Google PPC", "Meta Ads"] },
      { name: "Organic", items: ["Community Mgmt", "Profile Opt"] },
      { name: "Analysis", items: ["A/B Testing", "ROI Reporting"] },
    ],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    ],
  },
  {
    id: "04",
    title: "AI Automation",
    description:
      "Streamline operations with custom AI agents and workflow integrations.",
    categories: [
      { name: "Integration", items: ["Zapier / Make", "CRM Sync"] },
      { name: "Agents", items: ["Chatbots", "Lead Qualifiers"] },
      { name: "Workflow", items: ["Auto-Invoicing", "Data Entry"] },
    ],
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    ],
  },
  {
    id: "05",
    title: "Lead Generation",
    description:
      "Systematic approaches to filling your pipeline with qualified prospects.",
    categories: [
      { name: "Outbound", items: ["Cold Email", "LinkedIn"] },
      { name: "Inbound", items: ["Lead Magnets", "Landing Pages"] },
      { name: "Nurture", items: ["Email Funnels", "Scoring"] },
    ],
    images: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
      "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80",
    ],
  },
];

// ----------------------------------------------------------------------
// SUB-COMPONENT: Individual Service Item
// ----------------------------------------------------------------------
const ServiceItem = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);

  const [isFlipped, setIsFlipped] = useState(false);

  // 1. AUTO-FLIP LOGIC
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 2. GSAP ANIMATIONS
  useGSAP(
    () => {
      // A. ENTRANCE
      if (containerRef.current) {
        gsap.fromTo(
          containerRef.current,
          { scale: 0.95, opacity: 0.5, filter: "blur(2px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: true,
              toggleActions: "play reverse play reverse",
            },
          },
        );
      }

      // B. FLIP
      const rotationBase = index % 2 === 0 ? 6 : -6;
      const posFront = { x: 0, y: 0, rotation: 0, zIndex: 20, scale: 1 };
      const posBack = {
        x: index % 2 === 0 ? 20 : -20,
        y: 20,
        rotation: rotationBase,
        zIndex: 10,
        scale: 0.95,
      };

      if (isFlipped) {
        gsap.to(img2Ref.current, {
          ...posFront,
          duration: 0.8,
          ease: "power4.inOut",
        });
        gsap.to(img1Ref.current, {
          ...posBack,
          duration: 0.8,
          ease: "power4.inOut",
        });
      } else {
        gsap.to(img1Ref.current, {
          ...posFront,
          duration: 0.8,
          ease: "power4.inOut",
        });
        gsap.to(img2Ref.current, {
          ...posBack,
          duration: 0.8,
          ease: "power4.inOut",
        });
      }
    },
    { scope: containerRef, dependencies: [isFlipped] },
  );

  return (
    <React.Fragment>
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 py-24 group"
      >
        {/* LEFT: CONTENT */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8 order-2 lg:order-1">
          <div className="relative w-fit">
            <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight relative z-10">
              {service.title}
            </h2>
            <div className="absolute bottom-2 left-0 w-full h-3 bg-[#FF713D]/20 -z-0 transform -skew-x-12 origin-left transition-transform duration-500 group-hover:scale-x-110" />
          </div>

          <p className="text-lg text-zinc-600 max-w-md leading-relaxed">
            {service.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 mt-2">
            {service.categories.map((cat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <h4 className="font-bold text-sm text-zinc-900 border-l-2 border-[#FF713D] pl-2 uppercase tracking-wide">
                  {cat.name}
                </h4>
                <ul className="flex flex-col gap-1">
                  {cat.items.map((item, j) => (
                    <li key={j} className="text-xs text-zinc-500 font-medium">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: IMAGE PILE */}
        <div className="w-full lg:w-5/12 relative h-[300px] md:h-[400px] flex items-center justify-center lg:justify-end order-1 lg:order-2 perspective-[1000px]">
          <div
            ref={img1Ref}
            className="service-image absolute w-64 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white will-change-transform"
          >
            <img
              src={service.images[0]}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            ref={img2Ref}
            className="service-image absolute w-64 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white will-change-transform"
          >
            <img
              src={service.images[1]}
              alt={`${service.title} showcase`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {index !== services.length - 1 && (
        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      )}
    </React.Fragment>
  );
};

export default function Services() {
  const headerRef = useRef<HTMLDivElement>(null);

  // Optional: Animate the header on scroll
  useGSAP(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
      });
    }
  }, []);

  return (
    <section id="services" className="bg-white w-full py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col">
        {/* --- NEW HEADER SECTION --- */}
        <div
          ref={headerRef}
          className="flex flex-col items-center text-center mb-6 gap-4"
        >
          <h2 className="text-5xl md:text-4xl font-bold tracking-tighter text-zinc-900">
            Our Expertise.
          </h2>
          <p className="text-lg md:text-lg text-zinc-500 max-w-2xl font-medium">
            We don't just execute tasks. We build systems, craft stories, and
            engineer growth for ambitious brands.
          </p>
        </div>

        {/* SERVICES LIST */}
        {services.map((service, index) => (
          <ServiceItem key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
