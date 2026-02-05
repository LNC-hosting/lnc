"use client";
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsShowcase() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const trigger = triggerRef.current;
      const header = headerRef.current;
      const cards = cardsRef.current;

      if (!trigger || !header || !cards) return;

      const horizontalScroll = cards.scrollWidth;
      // const scrollEnd = horizontalScroll + window.innerHeight * 6;

      /* -------------------- Initial State -------------------- */

      gsap.set(header, {
        top: "50%",
        right: "50%",
        xPercent: 50,
        yPercent: -50,
        opacity: 0,
      });

      gsap.set(cards, {
        autoAlpha: 0,
        y: 400,
        x: 0,
      });

      /* -------------------- Timeline -------------------- */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top top",
          end: () => `+=${horizontalScroll + window.innerHeight * 3}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      // 1️⃣ Header fade in
      tl.to(header, {
        opacity: 1,
        duration: 0.15,
      });

      // 2️⃣ Header move
      tl.to(header, {
        top: 0,
        right: 0,
        xPercent: 0,
        yPercent: 0,
        duration: 0.2,
      });

      // 3️⃣ Cards appear
      tl.to(cards, {
        autoAlpha: 1,
        y: 100,
        duration: 0.15,
      });

      // 4️⃣ Horizontal scroll
      tl.to(cards, {
        x: () => -horizontalScroll,
        duration: 0.4,
        ease: "none",
      });
      tl.to(header, {
        x: () => -horizontalScroll,
        duration: 0.4,
        ease: "none",
      });
    },
    { scope: triggerRef },
  );

  return (
    <section
      id="projects-section"
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div
        ref={triggerRef}
        className="relative w-full min-h-screen overflow-hidden"
      >
        <div className="relative min-h-screen w-full overflow-hidden">
          <div
            ref={headerRef}
            className="absolute z-30 px-6 md:px-9 py-20
             w-screen max-w-5xl"
          >
            <h2 className="text-4xl md:text-7xl font-black uppercase text-white">
              Project Showcase
            </h2>
            <p className="mt-2 text-xs md:text-sm lg:text-lg font-bold tracking-widest text-white/40">
              Explore what we are building
            </p>
          </div>

          <div className="absolute inset-0 flex items-center">
            <div
              ref={cardsRef}
              className="flex gap-8 px-6 md:px-12 w-max will-change-transform"
            >
              {PROJECTS.map((project) => (
                <div key={project.id} className="w-[85vw] md:w-88 shrink-0">
                  <ProjectCard project={project} />
                </div>
              ))}

              <div className="w-[85vw] md:w-88 shrink-0 flex items-center justify-center border border-white/20 rounded-md bg-[#0d1117]">
                <Link href="/projects">
                  <span className="text-xl font-bold text-[#58a6ff]">
                    View All Projects →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
