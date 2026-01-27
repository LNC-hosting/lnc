"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "../data/projects";
import { fetchAllProjects, EnrichedProject } from "../utils/github";
import ProjectCard from "./ProjectCard";

export default function ProjectsShowcase() {
  const [projects, setProjects] = useState<EnrichedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const triggerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const githubUrls = PROJECTS.map((p) => p.githubUrl);
        const enrichedProjects = await fetchAllProjects(githubUrls);
        setProjects(enrichedProjects);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  useGSAP(
    () => {
      if (loading || projects.length === 0) return;

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
        y: 500,
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
        y: 0,
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
    { scope: triggerRef, dependencies: [loading, projects] }
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
          <div ref={headerRef} className="absolute z-30 px-6 md:px-12 py-20">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-white">
              Project Showcase
            </h2>
            <p className="mt-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/40">
              Explore what we are building
            </p>
          </div>

          <div className="absolute inset-0 flex items-center">
            {loading ? (
              <div className="flex items-center justify-center w-full h-full">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                  <p className="text-white/60 text-sm font-medium">
                    Loading projects from GitHub...
                  </p>
                </div>
              </div>
            ) : (
              <div
                ref={cardsRef}
                className="flex gap-8 px-6 md:px-12 w-max will-change-transform"
              >
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="w-[85vw] md:w-[400px] shrink-0"
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}

                <div className="w-[85vw] md:w-[400px] shrink-0 flex items-center justify-center border border-white/20 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md hover:border-purple-500/50 transition-all duration-300 group">
                  <Link href="/projects" className="p-8 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                        View All Projects
                      </span>
                      <span className="text-4xl group-hover:translate-x-2 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
