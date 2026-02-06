import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ----------------------------------------------------------------------
// DATA: Your Projects
// ----------------------------------------------------------------------
const projects = [
  {
    id: 1,
    client: "Double G",
    description:
      "A high-performance website integrated with custom AI automation agents to streamline client onboarding.",
    tags: ["Website", "AI Automation"],
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", // Analytics/Tech vibe
  },
  {
    id: 2,
    client: "Knok",
    description:
      "A seamless mobile application connecting users with local services, built for scale and performance.",
    tags: ["App Development"],
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop", // Mobile App vibe
  },
  {
    id: 3,
    client: "Luxe",
    description:
      "Premium digital presence combined with backend AI workflows to automate scheduling and customer support.",
    tags: ["Website", "AI Automation"],
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop", // High-end/Luxury vibe
  },
  {
    id: 4,
    client: "Bengal Wash",
    description:
      "A complete digital ecosystem including a booking website, mobile app, and targeted marketing campaigns.",
    tags: ["Website", "App", "Marketing"],
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=800&auto=format&fit=crop", // Service/Clean vibe
  },
  {
    id: 5,
    client: "Blushwork",
    description:
      "Strategic US market penetration through data-driven digital marketing and brand positioning.",
    tags: ["Web Development", "Marketing"],
    flag: "🇺🇸",
    image:
      "https://images.unsplash.com/photo-1522335207008-f0f2272d5f0d?q=80&w=800&auto=format&fit=crop", // Beauty/Marketing vibe
  },
  {
    id: 6,
    client: "Veerji",
    description:
      "Driving foot traffic and online orders through localized restaurant marketing strategies.",
    tags: ["Content Creation", "Marketing"],
    flag: "🇨🇦",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop", // Restaurant vibe
  },
];

// ----------------------------------------------------------------------
// SUB-COMPONENT: Project Card
// ----------------------------------------------------------------------
const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Hover Animation for the "View Project" button
  const handleMouseEnter = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale: 0.8, opacity: 0, duration: 0.3 });
    }
  };

  // Optional: Move button with cursor (Advanced feel)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (buttonRef.current && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top; // y position within the element.

      // Move the button slightly towards the cursor
      gsap.to(buttonRef.current, {
        x: (x - rect.width / 2) * 0.3, // 0.3 dampening factor
        y: (y - rect.height / 2) * 0.3,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="project-card flex flex-col gap-6 group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-sm transition-shadow duration-500 group-hover:shadow-2xl">
        <img
          src={project.image}
          alt={project.client}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* OVERLAY BUTTON (Hidden by default, shown on hover) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            ref={buttonRef}
            className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-2 shadow-xl opacity-0 scale-75 transform"
          >
            <span className="font-bold text-zinc-900 text-sm">
              View Project
            </span>
            <svg
              className="w-4 h-4 text-zinc-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="flex flex-col gap-3 px-2">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold text-zinc-900">{project.client}</h3>
        </div>

        <p className="text-zinc-500 text-base leading-relaxed max-w-md">
          {project.description}
        </p>

        {/* TAGS & FLAG */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-600"
            >
              {tag}
            </span>
          ))}
          <span className="text-lg ml-1" role="img" aria-label="Country Flag">
            {project.flag}
          </span>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------
export default function OurWork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = document.querySelectorAll(".project-card");

      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1, // Waterfall effect
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", // Start animating when section is 20% into view
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="w-full bg-white py-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tighter mb-6">
              Selected <span className="text-[#FF713D]">Work.</span>
            </h2>
            <p className="text-xl text-zinc-500">
              A curated collection of projects where we transformed digital
              presence into measurable growth.
            </p>
          </div>

          {/* Optional 'All Projects' Link
          <div className="hidden md:block pb-2">
            <button className="text-zinc-900 font-bold text-lg border-b-2 border-zinc-900 hover:text-[#FF713D] hover:border-[#FF713D] transition-colors pb-1">
              See all projects
            </button>
          </div> */}
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
