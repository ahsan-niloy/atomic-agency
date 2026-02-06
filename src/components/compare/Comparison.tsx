import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Placeholder for your local logo
import atomicLogo from "../../assets/AtomicLogo.svg?url";

gsap.registerPlugin(ScrollTrigger);

export default function Comparison() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".comparison-row", {
        y: 30,
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
    <section
      ref={containerRef}
      className="w-full bg-[#130803] py-32 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* HEADER */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase">
            Atomic Agency vs Other Options
          </span>
          <h2 className="text-4xl md:text-5xl font-medium text-white">
            How we are better than others
          </h2>
        </div>

        {/* TABLE CONTAINER */}
        <div className="w-full overflow-x-auto pb-4 hide-scrollbar">
          <table className="w-full min-w-[600px] md:min-w-[800px] border-collapse text-left">
            {/* TABLE HEADERS */}
            <thead>
              <tr>
                {/* Sticky Corner:
                   - Mobile: min-w-[150px]
                   - Desktop: w-[300px]
                */}
                <th className="p-4 md:p-6 min-w-[150px] md:w-[300px] sticky left-0 z-20 bg-[#130803]"></th>

                <th className="p-4 md:p-6 text-white font-medium text-sm md:text-lg whitespace-nowrap">
                  Speed & Flexibility
                </th>
                <th className="p-4 md:p-6 text-white font-medium text-sm md:text-lg whitespace-nowrap">
                  Brand Consistency
                </th>
                <th className="p-4 md:p-6 text-white font-medium text-sm md:text-lg whitespace-nowrap">
                  Cost-effectiveness
                </th>
                <th className="p-4 md:p-6 text-white font-medium text-sm md:text-lg whitespace-nowrap">
                  Innovation (AI)
                </th>
              </tr>
            </thead>

            <tbody className="space-y-4">
              {/* -------------------------------------------
                  ROW 1: ATOMIC (Highlighted)
              -------------------------------------------- */}
              <tr className="comparison-row group">
                {/* LEFT STICKY CELL */}
                <td className="p-0 sticky left-0 z-20 drop-shadow-2xl">
                  <div className="bg-[#FF713D] h-full rounded-l-2xl md:rounded-l-3xl p-4 md:p-8 flex flex-col justify-center gap-2 border-r border-white/10 min-h-[160px]">
                    <div className="h-6 md:h-8 mb-1">
                      <img src={atomicLogo} alt="Atomic Logo" />
                    </div>
                    {/* Hide description on tiny screens to save space */}
                    <p className="text-white/90 text-xs md:text-sm leading-snug max-w-[200px] hidden md:block">
                      Some of the reasons clients choose us over conventional
                      solutions.
                    </p>
                  </div>
                </td>

                <td className="bg-[#FF713D] p-4 md:p-8 align-middle text-center border-r border-white/10">
                  <CheckIcon large />
                </td>
                <td className="bg-[#FF713D] p-4 md:p-8 align-middle text-center border-r border-white/10">
                  <CheckIcon large />
                </td>
                <td className="bg-[#FF713D] p-4 md:p-8 align-middle text-center border-r border-white/10">
                  <CheckIcon large />
                </td>
                <td className="bg-[#FF713D] p-4 md:p-8 align-middle text-center rounded-r-2xl md:rounded-r-3xl">
                  <CheckIcon large />
                </td>
              </tr>

              <tr className="h-4 md:h-8"></tr>

              {/* -------------------------------------------
                  ROW 2: In-house Team
              -------------------------------------------- */}
              <tr className="comparison-row border-b border-white/5 last:border-0">
                <td className="p-0 sticky left-0 z-10 bg-[#130803]">
                  {/* LAYOUT CHANGE: 
                      - flex-col (Mobile): Stacks Icon on top of Text
                      - md:flex-row (Desktop): Side-by-side
                  */}
                  <div className="p-4 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 min-w-[150px] md:min-w-[300px]">
                    <IconBox icon="building" />
                    <div>
                      <h4 className="text-sm md:text-xl text-white font-medium leading-tight">
                        In-house Team
                      </h4>
                      <p className="text-white/50 text-[10px] md:text-sm mt-1 max-w-[120px] md:max-w-[180px] leading-tight">
                        Slower and costly to scale when demand spikes.
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CrossIcon />
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CheckIcon />
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CrossIcon />
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CrossIcon />
                </td>
              </tr>

              {/* -------------------------------------------
                  ROW 3: Creative Agencies
              -------------------------------------------- */}
              <tr className="comparison-row border-b border-white/5 last:border-0">
                <td className="p-0 sticky left-0 z-10 bg-[#130803]">
                  <div className="p-4 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 min-w-[150px] md:min-w-[300px]">
                    <IconBox icon="paint" />
                    <div>
                      <h4 className="text-sm md:text-xl text-white font-medium leading-tight">
                        Creative Agencies
                      </h4>
                      <p className="text-white/50 text-[10px] md:text-sm mt-1 max-w-[120px] md:max-w-[180px] leading-tight">
                        Expensive and often rigid with long timelines.
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CrossIcon />
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CrossIcon />
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CrossIcon />
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CheckIcon />
                </td>
              </tr>

              {/* -------------------------------------------
                  ROW 4: Freelancers
              -------------------------------------------- */}
              <tr className="comparison-row border-b border-white/5 last:border-0">
                <td className="p-0 sticky left-0 z-10 bg-[#130803]">
                  <div className="p-4 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 min-w-[150px] md:min-w-[300px]">
                    <IconBox icon="user" />
                    <div>
                      <h4 className="text-sm md:text-xl text-white font-medium leading-tight">
                        Freelancers
                      </h4>
                      <p className="text-white/50 text-[10px] md:text-sm mt-1 max-w-[120px] md:max-w-[180px] leading-tight">
                        Inconsistent quality and limited capacity.
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CrossIcon />
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CrossIcon />
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CrossIcon />
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CrossIcon />
                </td>
              </tr>

              {/* -------------------------------------------
                  ROW 5: DIY Tools
              -------------------------------------------- */}
              <tr className="comparison-row border-b border-white/5 last:border-0">
                <td className="p-0 sticky left-0 z-10 bg-[#130803]">
                  <div className="p-4 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 min-w-[150px] md:min-w-[300px]">
                    <IconBox icon="tool" />
                    <div>
                      <h4 className="text-sm md:text-xl text-white font-medium leading-tight">
                        DIY Tools
                      </h4>
                      <p className="text-white/50 text-[10px] md:text-sm mt-1 max-w-[120px] md:max-w-[180px] leading-tight">
                        Generic results without strategic guidance.
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CrossIcon />
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CheckIcon />
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CrossIcon />
                </td>
                <td className="p-4 md:p-8 text-center">
                  <CrossIcon />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// SUB-COMPONENTS
// ----------------------------------------------------------------------

const CheckIcon = ({ large = false }: { large?: boolean }) => (
  <div className="flex justify-center items-center w-full">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${large ? "w-6 h-6 md:w-8 md:h-8 text-white" : "w-5 h-5 md:w-6 md:h-6 text-white"}`}
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  </div>
);

const CrossIcon = () => (
  <div className="flex justify-center items-center w-full">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5 md:w-6 md:h-6 text-white/30"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  </div>
);

const IconBox = ({
  icon,
}: {
  icon: "building" | "paint" | "user" | "tool";
}) => {
  const getIcon = () => {
    switch (icon) {
      case "building":
        return <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />;
      case "paint":
        return <path d="M12 2v20M2 12h20" />;
      case "user":
        return (
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
        );
      case "tool":
        return (
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#FF713D] w-4 h-4 md:w-6 md:h-6"
      >
        {getIcon()}
      </svg>
    </div>
  );
};
