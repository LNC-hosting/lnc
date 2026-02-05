"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Card } from "@/components/ui/card";
import { LEADS } from "@/app/data/team";
export default function RealVoices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (
      containerRef.current &&
      triggerRef.current &&
      headerRef.current &&
      cardsRef.current
    ) {
      const mm = gsap.matchMedia();
      const scrollWidth = cardsRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      mm.add("(min-width: 768px)", () => {
        gsap.set(headerRef.current, {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
        });
        gsap.set(cardsRef.current, {
          x: windowWidth + 100,
          autoAlpha: 0,
          top: "50%",
          bottom: "auto",
          yPercent: -50,
        });
        const projectSection = document.getElementById("projects-section");
        if (projectSection) {
          gsap.set(projectSection, { autoAlpha: 0 });
        }
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=4000",
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        });
        tl.to(headerRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        tl.to(headerRef.current, {
          left: "0",
          xPercent: 0,
          duration: 1,
          ease: "power2.inOut",
        });
        tl.to(".header-bg", { opacity: 1, duration: 0.5 }, "<0.5");
        tl.to(
          cardsRef.current,
          {
            x: windowWidth * 0.35,
            autoAlpha: 1,
            duration: 1,
            ease: "power2.out",
          },
          "<0.2",
        );
        const finalX = -(scrollWidth - windowWidth + 100);
        tl.to(cardsRef.current, { x: finalX, duration: 3, ease: "none" });
        tl.to(containerRef.current, {
          xPercent: -100,
          duration: 1.5,
          ease: "power2.inOut",
        });
        if (projectSection) {
          tl.to(
            projectSection,
            { autoAlpha: 1, duration: 1.5, ease: "power2.out" },
            "<",
          );
        }
      });
      mm.add("(max-width: 767px)", () => {
        gsap.set(headerRef.current, {
          left: "50%",
          top: "15%",
          xPercent: -50,
          yPercent: 0,
          opacity: 0,
        });
        gsap.set(cardsRef.current, {
          x: windowWidth,
          autoAlpha: 0,
          top: "55%",
          bottom: "auto",
          yPercent: 0,
        });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        tl.to(headerRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        tl.to(".header-bg", { opacity: 1, duration: 0.5 }, "<");
        tl.to(
          cardsRef.current,
          { x: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" },
          "<",
        );
        const finalX = -(scrollWidth - windowWidth + 40);
        tl.to(cardsRef.current, { x: finalX, duration: 3, ease: "none" });
      });
      return () => mm.revert();
    }
  });
  return (
    <section id="real-voices" className="font-pixel">
      <div
        ref={triggerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <div
          ref={containerRef}
          className="relative h-full w-full z-30 bg-transparent"
        >
          <div
            ref={headerRef}
            className="absolute z-30 flex w-full max-w-2xl flex-col justify-center px-6 py-36 text-center md:text-left"
          >
            <div className="header-bg absolute inset-0 -z-10 bg-linear-to-r from-black via-black/90 to-transparent opacity-0 transition-opacity" />
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/40">
              visions
            </p>
            <h2 className="text-4xl font-black uppercase tracking-wide text-white md:text-7xl">
              Meet the Minds
            </h2>
            <p className="mt-4 text-large text-white/60">
              The minds behind the machine. clear vision, execution, and
              unwavering dedication.
            </p>
          </div>
          <div className="absolute inset-0 z-10 pointer-events-none md:pointer-events-auto">
            <div
              ref={cardsRef}
              className="absolute flex flex-row gap-6 opacity-0 pointer-events-auto pl-6 md:pl-0 will-[transform]"
            >
              {LEADS.map((lead, i) => (
                <Card
                  key={i}
                  className="relative flex h-[40vh] md:h-[50vh] w-[280px] md:w-[360px] shrink-0 flex-col justify-between border border-white/10 bg-[#1f1f23] p-6 md:p-8 transition-all duration-200 hover:bg-[#25252a] hover:scale-[1.02] rounded-3xl"
                >
                  <div className="mb-4 md:mb-6 text-5xl md:text-6xl font-serif text-white/10">
                    “
                  </div>
                  <p className="mb-6 md:mb-8 text-xs md:text-sm font-bold uppercase leading-relaxed text-white/90">
                    {lead.quote}
                  </p>
                  <div className="flex items-center gap-4 border-t border-white/10 pt-4 md:pt-6">
                    <div className="h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full border border-white/20">
                      <Image
                        src={lead.image}
                        alt={lead.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-black uppercase tracking-wider text-white">
                        {lead.name}
                      </h4>
                      <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-wider text-white/40">
                        {lead.role}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
