"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COMMUNITIES } from "@/app/data/partners";

gsap.registerPlugin(ScrollTrigger);

export default function Partners() {
  const container = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Split communities into two rows
  const midPoint = Math.ceil(COMMUNITIES.length / 2);
  const row1Communities = COMMUNITIES.slice(0, midPoint);
  const row2Communities = COMMUNITIES.slice(midPoint);

  // Duplicate arrays for seamless infinite loop
  const row1Duplicated = [...row1Communities, ...row1Communities, ...row1Communities];
  const row2Duplicated = [...row2Communities, ...row2Communities, ...row2Communities];

  useGSAP(
    () => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
    },
    { scope: container }
  );

  // Seamless infinite scroll animation
  useEffect(() => {
    if (row1Ref.current && row2Ref.current) {
      const row1Width = row1Ref.current.scrollWidth / 3; // Divide by 3 because we tripled the items
      const row2Width = row2Ref.current.scrollWidth / 3;

      // Row 1 - continuous scroll to the right
      gsap.to(row1Ref.current, {
        x: -row1Width,
        duration: 25,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % row1Width),
        },
      });

      // Row 2 - continuous scroll to the left (opposite direction)
      gsap.fromTo(
        row2Ref.current,
        { x: -row2Width },
        {
          x: 0,
          duration: 25,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % row2Width),
          },
        }
      );
    }
  }, []);

  const renderLogo = (community: typeof COMMUNITIES[0], index: number) => (
    <div
      key={`${community.name}-${index}`}
      className="group flex-shrink-0 flex items-center justify-center"
    >
      {/* Logo */}
      <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 border border-white/10 bg-gradient-to-br from-[#1a1a1f] to-[#0d0d10] hover:border-purple-500/40 transition-all duration-300 cursor-pointer flex items-center justify-center p-3 md:p-4">
        {/* Hover glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-transparent transition-all duration-500" />

        {/* Logo image */}
        <img
          src={community.logo}
          alt={`${community.name} logo`}
          className="relative z-10 w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
        />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-purple-500/30 group-hover:border-purple-400 transition-colors" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-purple-500/30 group-hover:border-purple-400 transition-colors" />
      </div>
    </div>
  );

  return (
    <section
      ref={container}
      className="relative bg-transparent py-16 md:py-24 w-full font-pixel overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative w-full">
        {/* Header Section */}
        <div ref={headerRef} className="mb-12 md:mb-16 text-center px-6">
          <div className="inline-block mb-6">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-purple-400 mb-2">
              // ECOSYSTEM
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
              POWERED BY
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600">
                THE BEST
              </span>
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-purple-500" />
            <div className="h-1 w-1 bg-purple-500 rounded-full animate-pulse" />
            <div className="h-[2px] w-16 bg-purple-500" />
            <div className="h-1 w-1 bg-purple-500 rounded-full animate-pulse" />
            <div className="h-[2px] w-8 bg-gradient-to-l from-transparent to-purple-500" />
          </div>
        </div>

        {/* Row 1 - Flowing left to right */}
        <div className="mb-8 md:mb-12 overflow-hidden">
          <div
            ref={row1Ref}
            className="flex items-center gap-8 md:gap-12 will-change-transform"
          >
            {row1Duplicated.map((community, index) =>
              renderLogo(community, index)
            )}
          </div>
        </div>

        {/* Row 2 - Flowing right to left */}
        <div className="overflow-hidden">
          <div
            ref={row2Ref}
            className="flex items-center gap-8 md:gap-12 will-change-transform"
          >
            {row2Duplicated.map((community, index) =>
              renderLogo(community, index)
            )}
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="mt-12 md:mt-16 flex items-center justify-center gap-2 px-6">
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <div className="text-[10px] font-mono text-white/20 tracking-widest">
            COLLABORATION NETWORK
          </div>
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
