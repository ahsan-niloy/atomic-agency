import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../ui/Button";

import img1 from "../../assets/image1.png?url";
import img2 from "../../assets/image2.png?url";
import img3 from "../../assets/image3.png?url";
import img4 from "../../assets/image4.png?url";
import img5 from "../../assets/image5.png?url";
import img6 from "../../assets/image6.png?url";
import img7 from "../../assets/image7.png?url";
import img8 from "../../assets/image8.png?url";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  const poolRef = useRef<(HTMLImageElement | null)[]>([]);
  const activeIndex = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const zIndexCounter = useRef(1);

  useGSAP(
    () => {
      // 1. SETUP: Hide pool images & Set centering anchor
      gsap.set(poolRef.current, {
        autoAlpha: 0,
        scale: 0.5,
        xPercent: -50,
        yPercent: -50,
      });

      // 2. MOBILE MARQUEE
      if (mobileTrackRef.current) {
        gsap.to(mobileTrackRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 30,
          repeat: -1,
        });
      }
    },
    { scope: containerRef },
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;

    const dist = Math.hypot(
      clientX - lastMousePos.current.x,
      clientY - lastMousePos.current.y,
    );

    if (dist > 100) {
      lastMousePos.current = { x: clientX, y: clientY };

      const img = poolRef.current[activeIndex.current];
      if (img) {
        zIndexCounter.current += 1;

        gsap.killTweensOf(img);

        // Step A: Set position at cursor
        gsap.set(img, {
          x: clientX,
          y: clientY,
          rotation: Math.random() * 20 - 10,
          scale: 0.8,
          autoAlpha: 1,
          zIndex: zIndexCounter.current,
        });

        // Step B: Pop in
        gsap.to(img, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });

        // Step C: Disappear
        gsap.to(img, {
          y: `+=${100}`,
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.in",
          delay: 0.2,
        });

        activeIndex.current =
          (activeIndex.current + 1) % poolRef.current.length;
      }
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-hidden pt-32 md:justify-center md:pt-0"
    >
      {/* -------------------------------------------
          DESKTOP IMAGE POOL
      -------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block">
        {[...Array(10)].map((_, i) => (
          <img
            key={i}
            ref={(el) => {
              if (el) poolRef.current[i] = el;
            }}
            src={images[i % images.length]}
            alt="trail"
            className="absolute left-0 top-0 h-auto w-auto max-w-[30vw] max-h-[40vh] rounded-2xl object-cover shadow-2xl"
          />
        ))}
      </div>

      {/* -------------------------------------------
          CONTENT LAYER
      -------------------------------------------- */}
      <div
        className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-8 px-4 text-center pt-16 md:pt-0 md:!bg-none"
        style={{
          background:
            "linear-gradient(180deg, #EDE6D6 0%, rgba(237, 230, 214, 0.80) 79.81%, rgba(237, 230, 214, 0.00) 100%)",
        }}
      >
        <h1 className="text-6xl font-extrabold tracking-tighter text-zinc-900 md:text-9xl md:leading-[0.9]">
          Digital Marketing <br />
          <span className="text-[#FF713D]">that Drives Growth.</span>
        </h1>

        <div className="mt-2 md:hidden">
          <Button
            variant="primary"
            className="!px-8 !py-4 text-lg shadow-xl shadow-orange-200"
          >
            Book a Demo
          </Button>
        </div>
      </div>

      {/* -------------------------------------------
          MOBILE IMAGE LAYER
      -------------------------------------------- */}
      <div className="pointer-events-none absolute bottom-4 left-0 z-0 w-full overflow-hidden md:hidden">
        <div ref={mobileTrackRef} className="flex w-max gap-4">
          {[...images, ...images, ...images].map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 shadow-lg"
            >
              <img
                src={src}
                alt="Showcase"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
